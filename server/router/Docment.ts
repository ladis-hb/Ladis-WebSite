// import { StrToUpperCase } from "../util/Format";
import * as DBs from "../mongoose/content";
import Send from "koa-send";
import fs from "fs";
import { ParameterizedContext } from "koa";
import { CrorQuary, casesContext, buy, buyList } from "typing";
import { KoaCtx } from "server";
export default async (Ctx: ParameterizedContext) => {
  const ctx: KoaCtx = Ctx as any;
  const Query = ctx.query as CrorQuary;
  const { SiteName, i18n } = Query;
  if (!SiteName || !i18n) ctx.assert(new Error("argumentError"), 400, "argumentError");
  // 判断是否是en
  const isEH = i18n === "en";
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
        Page: DBs.default.Page,
        Router: DBs.default.Router,
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
        Page: DBs.default.Page,
        Router: DBs.default.Router,
      };
    }
  })();
  const id = ctx.params.id as string;
  // 打印请求参数和指令
  if (!["GetHomeNews", "Down"].includes(id as never)) {
    console.log({ id, i18n, isEH, SiteName, time: new Date().toLocaleTimeString() });
  }
  switch (id) {
    case "Down":
      {
        const filePath: string = "../static/" + Query.fileName;
        console.log(filePath);
        ctx.assert(fs.existsSync(filePath), 400, "no files");
        ctx.attachment(filePath);
        await Send(ctx, filePath);
      }
      break;

    //
    case "GetContent":
      {
        // url
        const link: string = Query.link;
        // 类型：news
        const type = link.split("/")[1];
        let result: casesContext = {};
        console.log({ link, type });

        switch (type) {
          case "case":
            {
              const caseArr = ctx.$Query.CasesLinkArray;
              const index = caseArr.indexOf(link);
              const pre = caseArr[index - 1];
              const next = caseArr[index + 1];
              result.pre = ctx.$Query.CasesMap.get(pre);
              result.next = ctx.$Query.CasesMap.get(next);
            }
            break;
          case "news":
            {
              const newsArr = ctx.$Query.NewsLinkArray;
              const index = newsArr.indexOf(link);
              const pre = newsArr[index - 1];
              const next = newsArr[index + 1];
              result.pre = ctx.$Query.NewsMap.get(pre);
              result.next = ctx.$Query.NewsMap.get(next);
            }
            break;
        }

        ctx.body = result;
      }
      break;
    //获取官网主页轮播的新闻列表
    case "GetHomeNews":
      {
        ctx.body = await DB.News_list.find()
          .limit(10)
          .exec();
      }
      break;

    //转而使用Get_arg请求
    case "Get_arg":
      // 请求参数
      const { table, isNews } = Query;
      // 'queryKeys[]': [ 'MainTitle', 'MainTitle' ],
      const queryKeys: string[] = Query["queryKeys[]"]; 

      let query = {};
      if (queryKeys) {
        // querykeys：数组至包含一个字符串则会被自动转换为字符串格式，多个则为数组
        [queryKeys].flat().forEach((key) => {
          (query as any)[key] = Query[key];
        });
      }
      //
      {
        if(table === 'About'){
          (query as any).webSite = Query.SiteName
        }
      }
      console.log({ Query, query });
      // 申明结果变量
      let result;

      if (isNews) {
        result =
          (await (DB as any)[table]
            .find()
            .sort({ "data.time": -1 })
            .exec()) || false;
      } else {
        result = (await (DB as any)[table].find(query)) || false;
      }

      ctx.assert(result, 401, "数据库未检索到");
      ctx.body = result;
      break;
  }
};
