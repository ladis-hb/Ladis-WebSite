/* jshint esversion:8 */
const { Collection } = require("../config");
const { formatMD5, validation_jwt_user } = require("../util/Format");
const Multiparty = require("../util/multiparty");

module.exports = async (ctx, next) => {
  let id = ctx.params.id;
  console.log(`route in upload,id:${id},Method:${ctx.method}`);
  switch (ctx.method) {
    //put request
    case "PUT":
      {
        let { fields, files } = await Multiparty({ request: ctx.req });
        let {
          user: [user],
          token: [token]
        } = fields;
        if (!validation_jwt_user(user, token)) {
          return (ctx.body = {
            stat: false,
            error: "tokenValidationError",
            msg: "效验错误，token已过期或错误，请重新登录已刷新Token"
          });
        }

        switch (id) {
          case "down":
            {
              let [{ path, originalFilename, size }] = files;
              let [type] = fields.type;
              switch (type) {
                case "soft":
                  let {
                    selectSystem: [selectSystem],
                    title: [title],
                    platform: [platform],
                    selectLanguage: [selectLanguage],
                    version: [version],
                    update: [update]
                  } = fields;
                  break;
              }
              console.log(fields);

              ctx.body = { stat: true, msg: "已生成最新文档，是否查看" };
            }
            break;
          case "news":
          case "case":
            {
              let {
                content: [content],
                title: [title],
                editType
              } = fields;
              let {
                pic: [{ fieldName, path, size }]
              } = files;
              //valition pic
              if (size > 20480000) return;

              //格式化图片文件地址，去掉static

              let PicPath = path.split("/");
              PicPath.shift();
              PicPath = "/" + PicPath.join("/");
              //console.log(PicPath);

              let dates = new Date();
              let href = `/${id}/${title}`;
              let route = { rout: href, modifyTime: dates };
              let type = {
                sv: "［服务通告］",
                cto: "［企业新闻］",
                hy: "［行业新闻］",
                cp: "［产品新闻］",
                power: "[UPS电源]",
                yth: "[一体化机柜]",
                dt: "[数据中心]",
                ac: "[机房空调]"
              };

              ctx.db
                .collection(Collection.router)
                .updateOne(
                  { rout: route },
                  { $set: { modifyTime: dates } },
                  { upsert: true }
                );
              let li = {
                name: type[editType],
                time: `${dates.getFullYear()}年${dates.getMonth() +
                  1}月${dates.getDate()}日`,
                text: title,
                href,
                img: PicPath,
                linkText: "查看详情 >"
              };
              ctx.db
                .collection(Collection[id])
                .updateOne(
                  { title },
                  { $set: { data: li, date: dates } },
                  { upsert: true }
                );

              let cont = {
                title,
                data: content,
                date: dates,
                new: true
              };
              ctx.db.collection(Collection[id + "_list"]).insertOne(cont);

              //console.log({ href, li, cont });
              ctx.body = { stat: true, msg: "已生成最新文档，是否查看", href };
            }
            break;
        }
      }
      break;
    case "GET":
      {
        let { user, token } = ctx.query;
        if (!validation_jwt_user(user, token)) {
          return (ctx.body = {
            stat: false,
            error: "tokenValidationError",
            msg: "效验错误，token已过期或错误，请重新登录已刷新Token"
          });
        }
        let result = { stat: true, msg: "", data: null };
        switch (id) {
          case "dealers":
            let {
              daqu,
              province,
              city,
              area,
              address,
              tel,
              linkman,
              phone,
              remark
            } = ctx.query;
            let stopn = 2;
            if (province === "黑龙江省") stopn = 3;
            province = province
              .split("")
              .slice(0, stopn)
              .join("");
            let site = {
              title: `${city} （${province}销售服务中心)`,
              data: {
                parentsUntil: daqu,
                parent: province,
                title: `${city} （${province}销售服务中心)`,
                content: {
                  area,
                  address: province + city + area + address,
                  tel,
                  linkman,
                  phone,
                  remark
                },
                new: true
              },
              date: new Date()
            };
            result.msg = "已写入数据";
            result.data = await ctx.db
              .collection(Collection.buy_list)
              .insertOne(site);
            break;
        }
        ctx.body = result;
      }
      break;
  }

  await next;
};
