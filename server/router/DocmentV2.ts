// import { StrToUpperCase } from "../util/Format";
import * as DBs from "../mongoose/content";
import Send from "koa-send";
import fs from "fs";
import { ParameterizedContext } from "koa";
import { CrorQuary, casesContext, KoaCtx } from "typing";
import { Model, Document } from "mongoose";
export default async (Ctx: ParameterizedContext) => {
    const ctx: KoaCtx = Ctx as any;
    const body = ctx.request.body as CrorQuary

    const SiteName = decodeURI(ctx.header.name)
    const i18n = ctx.cookies.get('Ladis_WebSite_I18n') || 'zh'
    console.log({ body, SiteName, i18n, id: ctx.params });

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
    switch (id) {
        case "Down":
            {
                const filePath: string = "../static/" + body.fileName;
                // console.log(filePath);
                ctx.assert(fs.existsSync(filePath), 400, "no files");
                ctx.attachment(filePath);
                await Send(ctx, filePath);
            }
            break;

        //
        case "GetContent":
            {
                // url
                const link: string = body.link;
                ctx.assert(link, 404, 'src is null')
                // 类型：news
                const type = link.split("/")[1];
                let result: casesContext = {};
                // console.log({ link, type });

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
            const { table, isNews } = body;
            const dbs: Model<Document, {}> = (DB as any)[table]
            if (isNews) {
                ctx.body = await dbs.find().sort({ "data.time": -1 }).lean()
            } else {
                if (table === 'About') {
                    ctx.body = await dbs.find({ webSite: SiteName }).sort({ "data.time": -1 }).lean()
                } else {
                    const queryKeySet = new Set(body.queryKeys as string[])
                    const dbQuery = Object.entries(body).filter(([key]) => queryKeySet.has(key)).map(el => ({ [el[0]]: el[1] }))
                    ctx.body = await dbs.find(Object.assign({}, ...dbQuery)).sort({ "data.time": -1 }).lean()
                }
            }
            break;
    }
};
