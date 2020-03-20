// import { StrToUpperCase } from "../util/Format";
import * as DBs from "../mongoose/content";
import { ParameterizedContext } from "koa";
import { CrorQuary, buyListPack } from "../typing/interface";
export default async (ctx:ParameterizedContext) => {
  const Query = ctx.query as CrorQuary
  const {SiteName,i18n} = Query
  if(!SiteName || !i18n) ctx.assert(new Error('argumentError'),400,'argumentError')
  // 判断是否是en
  const isEH = i18n === "en";
  // 打印请求参数和指令
  console.log({i18n,isEH,SiteName,time:new Date().toLocaleTimeString()});

  const DB = (() => {
    if (isEH) {
      return {
        Product: DBs.default.EnProduct,
        Product_list: DBs.default.EnProduct_list,
        Support: DBs.default.EnSupport,
        Support_list: DBs.default.EnSupport_list,
        Buy_list: DBs.default.Buy_list,
        Buy: DBs.default.Buy,
        VR: DBs.default.VR,
        Case: DBs.default.EnCase,
        Case_list: DBs.default.EnCase_list,
        News: DBs.default.EnNews,
        News_list: DBs.default.EnNews_list,
        About: DBs.default.EnAbout,
        Head: DBs.default.Head,
        Page: DBs.default.Page,
        Router: DBs.default.Router,
        SaveRouter: DBs.default.SaveRouter
      };
    } else {
      return {
        Product: DBs.default.Product,
        Product_list: DBs.default.Product_list,
        Support: DBs.default.Support,
        Support_list: DBs.default.Support_list,
        Buy_list: DBs.default.Buy_list,
        Buy: DBs.default.Buy,
        VR: DBs.default.VR,
        Case: DBs.default.Case,
        Case_list: DBs.default.Case_list,
        News: DBs.default.News,
        News_list: DBs.default.News_list,
        About: DBs.default.About,
        Head: DBs.default.Head,
        Page: DBs.default.Page,
        Router: DBs.default.Router,
        SaveRouter: DBs.default.SaveRouter
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
          .exec()
      }
      break;
    //获取经销商列表子类
    case "Get_buy_li":
      {
        const city:string = Query.city;
        const res = await DB.Buy_list.findOne().lean() as buyListPack;
        const result =res.data.filter((el) => el.parent === city);
        ctx.body = result;
      }
      break;

    //转而使用Get_arg请求
    case "Get_arg":
      // 请求参数
      const {table, title, parent, isNews,SiteName } = Query
      // 申明结果变量
      let result;

      if (title) {
        result = (await (DB as any)[table].findOne({ title })) || false;
      } else if (parent) {
        result = (await (DB as any)[table].find({ parent })) || false;
      } else {
        if (isNews) {
          result =
            (await (DB as any)[table]
              .find()
              .sort({ "data.time": -1 })
              .exec()) || false;
        } else {
          result = (await (DB as any)[table].find()) || false;
        }
      }
      ctx.assert(result,401,"数据库未检索到")
      ctx.body = result;
      break;
  }
};
