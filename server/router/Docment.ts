import { StrToUpperCase } from "../util/Format";
import {content } from "../userSetup/user"
import * as DBs from "../mongoose/content";
import { ParameterizedContext } from "koa";
export default async (ctx:ParameterizedContext) => {
  // 检查客户端语言环境
  const I18n = ctx.cookies.get("Ladis_WebSite_I18n");
  const isZH = I18n === "zh";
  console.log({I18n,isZH,time:new Date().toLocaleTimeString()});

  const DB = (() => {
    if (isZH) {
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
    } else {
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
    }
  })();
  const id = ctx.params.id;
  switch (id) {
    // 给予显示参数
    case "runInfo":
      {
        const siteName = ctx.query.siteName
        ctx.body = (content as any)[siteName]
      }
      break
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
        let { data } = await DB.Buy_list.findOne().lean() as any;
        let result = data.filter((el: { parent: any; }) => el.parent === city);
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
      console.log(result);

      ctx.body = result;
      break;
  }
};
