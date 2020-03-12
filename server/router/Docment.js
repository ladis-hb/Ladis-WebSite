const { StrToUpperCase } = require("../util/Format");

const DBs = require("../mongoose/content");
module.exports = async ctx => {
  // 检查客户端语言环境
  const I18n = ctx.cookies.get("Ladis_WebSite_I18n")
  
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
  const { id } = ctx.params;
  switch (id) {
    //获取官网主页轮播的新闻列表
    case "Get_index_news_list":
      {
        let result1 = await DB.News_list.find()
          .limit(10)
          .exec();
        ctx.body = result1;
      }
      break;
    //获取page头文件
    case "Head":
      {
        let head = await DB.Head.findOne({ title: id }); //mongo.findOne({ title: id });
        Head = json2html(head.data);
        ctx.body = Head;
      }
      break;
    //获取产品信息分类列表
    case "Products_list":
      {
        let get_products_list = await DB.Page.findOne({
          title: "products_asid"
        });
        ctx.body = get_products_list;
      }
      break;
    //获取所有产品信息
    case "Products_all":
      {
        let Products_all = await DB.Product.findOne({ title: "All" }); // mongo_Products.findOne({ title: "All" });
        ctx.body = Products_all;
      }
      break;
    //获取软件下载列表
    case "Get_support_down_list":
      {
        let Get_support_down_list = await DB.Support.find({
          parent: ctx.query.table
        });
        ctx.body = Get_support_down_list;
      }
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_news_list":
      {
        let result = await DB.News.find()
          .sort({ "data.time": -1 })
          .exec();
        ctx.body = result;
      }
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_case_list":
      {
        let result = await DB.Case.find()
          .sort({ "data.time": -1 })
          .exec();
        ctx.body = result;
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
      var table = StrToUpperCase(ctx.query.table);
      var title = ctx.query.title;
      if (title) ctx.body = await DB[table].findOne({ title });
      else ctx.body = DB[table] ? await DB[table].find() : {};
      break;

    // request Get_Products_head,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_Products_Head请求
    case "Get_head":
      ctx.body = await DB.Head.findOne({ title: ctx.query.title });
      break;
  }
};
