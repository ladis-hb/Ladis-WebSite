/* jshint esversion:8 */
import Router from "koa-router";
import Auth from "./auth";
import Upload from "./upload";
import Edit from "./edit";
import Docment from "./Docment";
import File, { getFileStatAndDown } from "./file";
import Send from "koa-send";
import { ParameterizedContext } from "koa";

const router = new Router();
// 下载附件
router.get("/down/:title", down);
router.get("/upload/:title", down);
// 图片
router.get("/_CMS_NEWS_IMG_/*", File);
router.get("/a_images/*", File);
//
router.post("/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/edit/:id", Edit);
router.get("/api/:id", Docment);

async function down(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) {
  try {
    const result = await getFileStatAndDown(ctx.path);
    if (result.stat) {
      const filePath: string = "/static/" + ctx.path;

      ctx.attachment(filePath);
      await Send(ctx, filePath);
    } else {
      ctx.throw(400, "no files");
    }
  } catch (error) {
    ctx.throw(400, error);
  }
}

export default router;
