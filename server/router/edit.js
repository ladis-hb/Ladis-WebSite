/* jshint esversion:8 */
const { validation_jwt_user } = require("../util/Format");
const DBs = require("../mongoose/content");
const fs = require("fs");
const path = require("path");
module.exports = async ctx => {
  // 检查客户端语言环境
  const isZH = ctx.cookies.get("Ladis_WebSite_I18n") === "zh";

  const DB = (() => {
    if (isZH) {
      return {
        Product: DBs.Product,
        Product_list: DBs.Product_list,
        Support: DBs.Support,
        Support_list: DBs.Support_list,
        Buy_list: DBs.Buy_list,
        Buy: DBs.Buy,
        VR: DBs.VR,
        Case: DBs.Case,
        Case_list: DBs.Case_list,
        News: DBs.News,
        News_list: DBs.News_list,
        About: DBs.About,
        Head: DBs.Head,
        Page: DBs.Page,
        Router: DBs.Router,
        SaveRouter: DBs.SaveRouter
      };
    } else {
      return {
        Product: DBs.EnProduct,
        Product_list: DBs.EnProduct_list,
        Support: DBs.EnSupport,
        Support_list: DBs.EnSupport_list,
        Buy_list: DBs.EnBuy_list,
        Buy: DBs.EnBuy,
        VR: DBs.EnVR,
        Case: DBs.EnCase,
        Case_list: DBs.EnCase_list,
        News: DBs.EnNews,
        News_list: DBs.EnNews_list,
        About: DBs.EnAbout,
        Head: DBs.Head,
        Page: DBs.Page,
        Router: DBs.Router,
        SaveRouter: DBs.SaveRouter
      };
    }
  })();
  const id = ctx.params.id;
  const query = ctx.query;
  if (!validation_jwt_user(query.user, query.token)) {
    ctx.body = { stst: false, code: 0, msg: "tokon erroe" };
  }
  let result = { code: 200, msg: "success", stat: true, data: query };
  switch (id) {
    //set Carousel
    case "setCarousel":
      let imgs = query.imgs;
      let rs = await DB.Head.updateOne(
        { title: "Carousel" },
        { $set: { data: imgs.split("+") } },
        { upsert: true }
      );
      result.msg = "carousel use success";
      result.data = rs;
      break;
    //add 常见问题
    case "problem":
      {
        let { title, movie, html, selectparentsUntil, selectparent } = query;
        let href = `/support/problem/${title}`;
        DB.SaveRouter({ rout: href });
        let obj = {
          title,
          href,
          date: new Date(),
          parentsUntil: selectparentsUntil,
          parent: selectparent
        };
        if (html === "输入") obj.movie = movie;
        else obj.html = html;
        let support_list = new DB.Support_list(obj);
        result.result = await support_list.save();
      }
      break;
    case "soft":
      {
        let {
          selectSystem,
          title,
          platform,
          selectLanguage,
          version,
          update,
          file
        } = query;
        let fileType = "soft";
        if (file.includes(".pdf")) fileType = "pdf";
        let f = fs.statSync(path.join("static", file));
        let obj = {
          type: fileType,
          title,
          date: new Date(),
          platform,
          language: selectLanguage,
          size: f.size / 1024 / 1024 + "MB",
          version,
          updateReason: update,
          down: file,
          href: file
        };

        let data = await DB.Support.updateOne(
          { title: selectSystem },
          { $addToSet: { data: obj } }
        );
        result.msg = "已保存文档，请查看记录";
        result.result = data;
      }
      break;
    //产品
    case "product":
      {
        let {
          selectType,
          title,
          content_head,
          content_body,
          indexPic,
          carouselPic
        } = query;
        let href = `/products/list/${title}`;
        DB.SaveRouter({ rout: href });
        let titles = { title, href, img: indexPic };
        await DB.Product.updateOne(
          { title: selectType },
          { $addToSet: { data: titles } }
        );
        let product_list = new DB.Product_list({
          parant: selectType,
          title,
          date: new Date(),
          data: {
            content_head,
            content_body,
            img: carouselPic.split("+")
          }
        });
        result.href = href;
        result.result = await product_list.save();
      }
      break;
    //设置case
    case "SendNewCaseEdit":
      {
        let { pic, content, title, editType, inputType } = query;
        //格式化图片文件地址，去掉static

        let dates = new Date();
        let href = `/${inputType}/${title}`;
        DB.SaveRouter({ rout: href });
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

        DB.Router.updateOne(
          { rout: route.rout },
          { $set: route },
          { upsert: true }
        );

        let collection = DB.News;
        let collection_list = DB.News_list;
        switch (inputType) {
          case "case":
            collection = DB.Case;
            collection_list = DB.Case_list;
            break;
        }
        let list = new collection({
          title,
          data: {
            name: type[editType],
            time: `${dates.getFullYear()}年${dates.getMonth() +
              1}月${dates.getDate()}日`,
            text: title,
            href,
            img: pic,
            linkText: "查看详情 >"
          }
        });
        list.save();

        let cont = new collection_list({
          title,
          data: content,
          date: dates,
          new: true
        });
        cont.save();
        result.msg = "已生成最新文档，是否查看";
        result.href = href;
      }
      break;
    //获取图片素材
    case "Get_file_Source":
      {
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
      };
      result.msg = "已写入数据";
      result.data = await DB.Buy_list.updateOne(
        { title: "buy_map" },
        { $push: { data: site } }
      );
      break;
    //setAbout
    case "setAbout":
      {
        let { selectType, webSite, content } = ctx.query;
        let st = await DB.About.findOne({
          title: selectType,
          "content.webSite": webSite
        });
        if (st) {
          result.data = await DB.About.updateOne(
            { title: selectType, "content.webSite": webSite },
            { $set: { "content.$.body": content } }
          );
        } else {
          result.data = await DB.About.updateOne(
            { title: selectType },
            { $push: { content: { body: content, webSite } } },
            { upsert: true }
          );
        }
      }
      break;
    case "getAbout":
      {
        let { selectType, webSite } = ctx.query;
        result.data = await DB.About.findOne({
          title: selectType
        }).then(res => {
          if (!res) return "";
          let result = res.content.filter(el => el.webSite == webSite);
          return result.length > 0 ? result[0].body : "";
        });
      }
      break;
  }
  ctx.body = result;
};
