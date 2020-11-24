/* jshint esversion:8 */
import Router from "koa-router";
import Auth from "./auth";
import Upload from "./upload";
import Docment from "./Docment";
import DocmentV2 from "./DocmentV2";
import File, { getFileStatAndDown } from "./file";/* 
import fs from "fs"
// import Send from "koa-send";
import { ParameterizedContext } from "koa"; */
import { AgentConfig, LinkFrend } from "../mongoose/config";
import { Agents } from "typing";

const router = new Router();
// 下载附件
router.get("/down/*", File);
router.get("/upload/*", File);
// 图片
router.get(/(\/_CMS_NEWS_IMG_\/*|a_images\/*)/, File);
// router.get("/a_images/*", File);
//
router.post("/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/api/:id", Docment);
router.post("/api/v2/:id", DocmentV2);

router.get("/config/:id", async (ctx) => {
  const query = ctx.query
  switch (ctx.params.id) {
    case "agent":
      {
        ctx.body = await AgentConfig.findOne({ name: query.name }).lean()
      }
      break;
    case "linkFrend":
      {
        const agents = await AgentConfig.find({ share: true }).select(['name', 'url']).lean() as Agents[]
        const links = await LinkFrend.find().lean()

        const agentsParse = agents.map(el => ({ name: el.name, link: el.url }))
        ctx.body = [...agentsParse, ...links]
      }
      break
    default:
      break;
  }

})
/* 
async function down(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) {
  try {
    const result = await getFileStatAndDown(ctx.path);
    console.log({result});
    
    if (result.stat) {
      // 文件路径需要定位到npm根目录,Send函数会二次处理路径
      const filePath: string = "server/static/" + ctx.path;

      ctx.attachment(result.Path);
      ctx.body = fs.createReadStream(result.Path)
      //await Send(ctx, filePath); 
    } else {
      ctx.throw(400, "no files");
    }
  } catch (error) {
    ctx.throw(400, error);
  }
} */

export default router;
