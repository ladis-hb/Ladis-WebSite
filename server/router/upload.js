/* jshint esversion:8 */
const { Collection } = require("../config");
const { validation_jwt_user, SerizeFormattoObject } = require("../util/Format");
const fs = require("fs");
const path = require("path");
const Multiparty = require("../util/multiparty");

module.exports = async (ctx, next) => {
  let id = ctx.params.id;
  console.log(`route in upload,id:${id},Method:${ctx.method}`);
  switch (ctx.method) {
    //put request
    case "PUT":
      {
        let UploadFile = await Multiparty(ctx.req);
        let { user, token } = UploadFile.fields;
        if (!validation_jwt_user(user, token)) {
          UploadFile.files.forEach(file => {
            fs.unlinkSync(file.path);
          });
          return (ctx.body = {
            stat: false,
            error: "tokenValidationError",
            msg: "效验错误，token已过期或错误，请重新登录已刷新Token"
          });
        }
        ctx.body = {
          code: 200,
          data: UploadFile.files
        };

        /* switch (id) {
          case "product":
            {
              let {
                content_body,
                content_head,
                selectType,
                title
              } = UploadFile.fields;

              let { files, indexPic } = UploadFile.files;
              let href = `/products/list/${title}`;
              let titles = {
                title,
                href,
                img: indexPic.path
              };
              let content = {
                parant: selectType,
                title,
                date: new Date(),
                data: {
                  content_head,
                  content_body,
                  img: files
                }
              };

              ctx.db
                .collection(Collection.products)
                .updateOne(
                  { title: selectType },
                  { $addToSet: { data: titles } }
                );
              let { result } = await ctx.db
                .collection(Collection.Products_list)
                .insertOne(content);

              ctx.body = { result, code: 200, href };
            }
            break;
          case "down":
            {
              let {
                selectSystem,
                title,
                platform,
                selectLanguage,
                version,
                update
              } = UploadFile.fields;
              let {
                originalFilename,
                path: filePath,
                size
              } = UploadFile.fields.pic;
              let obj = {};
              if (originalFilename.includes(".pdf")) {
                obj = {
                  type: "pdf",
                  title,
                  href: filePath
                };
              } else {
                obj = {
                  type: "soft",
                  title,
                  date: new Date(),
                  platform,
                  language: selectLanguage,
                  size: size / 1024 / 1024 + "MB",
                  version,
                  updateReason: update,
                  down: filePath
                };
              }
              await ctx.db.collection(Collection.support).updateOne(
                {
                  title: selectSystem
                },
                { $pull: { data: { title } } }
              );
              let result = await ctx.db
                .collection(Collection.support)
                .updateOne(
                  {
                    title: selectSystem,
                    "data.title": { $ne: title }
                  },
                  { $addToSet: { data: obj } }
                );

              ctx.body = {
                stat: true,
                msg: "已保存文档，请查看记录",
                result: result.result
              };
            }
            break;
          case "news":
          case "case":
            {
              let { content, title, editType } = UploadFile.fields;
              let {
                originalFilename,
                path: PicPath,
                size
              } = UploadFile.fields.pic;
              //valition pic
              if (size > 20480000) return;
              //格式化图片文件地址，去掉static

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
        } */
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
          //获取图片素材
          case "Get_file_Source":
            {
              /* let uploadPiclist = fs.readdirSync(
                path.join(__dirname, "../../static/upload")
              ); */
              let pic = fs
                .readdirSync(path.join(__dirname, "../../static/upload"))
                .filter(source => {
                  if (ctx.query.filter && ctx.query.filter !== "") {
                    return source.includes(ctx.query.filter);
                  } else {
                    return source;
                  }
                });
              let uploadPiclist = pic.map(img => {
                return `/upload/${img}`;
              });
              result.data = uploadPiclist;
            }
            break;
          //设置经销商列表
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
    case "POST":
      {
        let { type, user, token } = ctx.request.body;
        if (!validation_jwt_user(user, token)) {
          return (ctx.body = {
            stat: false,
            error: "tokenValidationError",
            msg: "效验错误，token已过期或错误，请重新登录已刷新Token"
          });
        }
        let body = {
          stat: true,
          msg: "已保存文档，请查看记录",
          result: {}
        };
        switch (type) {
          case "problem":
            {
              let {
                title,
                movie,
                html,
                selectparentsUntil,
                selectparent
              } = ctx.request.body;
              let obj = {
                title,
                href: `/support/problem/${title}`,
                date: new Date(),
                parentsUntil: selectparentsUntil,
                parent: selectparent
              };
              if (html === "输入") obj.movie = movie;
              else obj.html = html;
              await ctx.db
                .collection(Collection.support_list)
                .deleteMany({ title });
              let result = await ctx.db
                .collection(Collection.support_list)
                .insertOne(obj);

              body.result = result.result;
            }
            break;
        }
        ctx.body = body;
      }
      break;
  }

  await next;
};
