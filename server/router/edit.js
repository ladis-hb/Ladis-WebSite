const { validation_jwt_user } = require("../util/Format");
const { Collection } = require("../config");
const fs = require("fs");
const path = require("path");
module.exports = async (ctx, next) => {
  let id = ctx.params.id;
  let query = ctx.query;
  if (!validation_jwt_user(query.user, query.token)) {
    ctx.body = { stst: false, code: 0, msg: "tokon erroe" };
  }
  let result = { code: 200, msg: "success", stat: true, data: query };
  switch (id) {
    //add 常见问题
    case "problem":
      {
        let { title, movie, html, selectparentsUntil, selectparent } = query;
        let obj = {
          title,
          href: `/support/problem/${title}`,
          date: new Date(),
          parentsUntil: selectparentsUntil,
          parent: selectparent
        };
        if (html === "输入") obj.movie = movie;
        else obj.html = html;
        await ctx.db.collection(Collection.support_list).deleteMany({ title });
        let data = await ctx.db.collection(Collection.support_list).insertOne(obj);

        result.result = data.result;
      }
      break;
    case "soft":
      {
        let { selectSystem, title, platform, selectLanguage, version, update, file } = query;
        let obj = {};
        if (file.includes(".pdf")) {
          obj = {
            type: "pdf",
            title,
            href: file
          };
        } else {
          let f = fs.statSync(path.join("static", file));

          obj = {
            type: "soft",
            title,
            date: new Date(),
            platform,
            language: selectLanguage,
            size: f.size / 1024 / 1024 + "MB",
            version,
            updateReason: update,
            down: file
          };
        }
        await ctx.db.collection(Collection.support).updateOne(
          {
            title: selectSystem
          },
          { $pull: { data: { title } } }
        );
        let data = await ctx.db.collection(Collection.support).updateOne(
          {
            title: selectSystem,
            "data.title": { $ne: title }
          },
          { $addToSet: { data: obj } }
        );
        result.msg = "已保存文档，请查看记录";
        result.result = data.result;
      }
      break;
    //产品
    case "product":
      {
        let { selectType, title, content_head, content_body, indexPic, carouselPic } = query;
        let href = `/products/list/${title}`;
        let titles = { title, href, img: indexPic };
        let content = {
          parant: selectType,
          title,
          date: new Date(),
          data: {
            content_head,
            content_body,
            img: carouselPic
          }
        };

        ctx.db
          .collection(Collection.products)
          .updateOne({ title: selectType }, { $addToSet: { data: titles } });
        let { result: data } = await ctx.db.collection(Collection.Products_list).insertOne(content);
        result.href = href;
        result.data = data;
      }
      break;
    //设置case
    case "SendNewCaseEdit":
      {
        let { pic, content, title, editType, inputType } = query;
        //格式化图片文件地址，去掉static

        let dates = new Date();
        let href = `/${inputType}/${title}`;
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
          .updateOne({ rout: route }, { $set: { modifyTime: dates } }, { upsert: true });
        let li = {
          name: type[editType],
          time: `${dates.getFullYear()}年${dates.getMonth() + 1}月${dates.getDate()}日`,
          text: title,
          href,
          img: pic,
          linkText: "查看详情 >"
        };
        ctx.db
          .collection(Collection[inputType])
          .updateOne({ title }, { $set: { data: li, date: dates } }, { upsert: true });

        let cont = {
          title,
          data: content,
          date: dates,
          new: true
        };
        ctx.db.collection(Collection[inputType + "_list"]).insertOne(cont);
        result.msg = "已生成最新文档，是否查看";
        result.href = href;
      }
      break;
    //获取图片素材
    case "Get_file_Source":
      {
        let pic = fs.readdirSync(path.join(__dirname, "../../static/upload")).filter(source => {
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
      let { daqu, province, city, area, address, tel, linkman, phone, remark } = ctx.query;
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
      result.data = await ctx.db.collection(Collection.buy_list).insertOne(site);
      break;
  }
  ctx.body = result;
  await next;
};
