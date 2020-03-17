const { StrToUpperCase } = require("../util/Format");

const DBs = require("../mongoose/content");
module.exports = async ctx => {
  // 检查客户端语言环境
  const I18n = ctx.cookies.get("Ladis_WebSite_I18n");
  console.log(I18n);

  const isZH = I18n === "zh";

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
        Buy_list: DBs.Buy_list,
        Buy: DBs.Buy,
        VR: DBs.VR,
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
  switch (id) {
    //获取官网主页轮播的新闻列表
    case "GetHomeNews":
      {
        ctx.body = await DB.News_list.find()
          .limit(10)
          .exec();
      }
      break;
    //获取经销商列表子类
    case "Get_buy_li":
      {
        let city = ctx.query.city;
        let { data } = await DB.Buy_list.findOne();
        let result = data.filter(el => el.parent === city);
        ctx.body = result;
      }
      break;

    //转而使用Get_arg请求
    case "Get_arg":
      // table转换大写
      const table = StrToUpperCase(ctx.query.table);
      const { title, parent, isNews } = ctx.query;
      let result;

      if (title) {
        result = (await DB[table].findOne({ title })) || false;
      } else if (parent) {
        result = (await DB[table].find({ parent })) || false;
      } else {
        if (isNews) {
          result =
            (await DB[table]
              .find()
              .sort({ "data.time": -1 })
              .exec()) || false;
        } else {
          result = (await DB[table].find()) || false;
        }
      }
      console.log(result);

      ctx.body = result;
      break;
  }
};
