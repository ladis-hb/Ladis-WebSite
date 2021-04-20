/* jshint esversion:8 */
import Router from "koa-router";
import fs from "fs"
import { parse, join } from "path"
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

// 响应代理商网站配置
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

// 响应后台文件操作
router.post("/file/:id", async (ctx) => {
  const body = ctx.request.body
  switch (ctx.params.id) {
    case "rename":
      {
        const { path, name: newName } = body
        const { dir, ext } = parse(path)
        const newPth = join(__dirname, '../static', dir, newName + ext)
        const oldPth = join(__dirname, "../static", path)
        fs.renameSync(oldPth, newPth)
        ctx.body = {
          code: 200,
          msg: '重命名成功'
        }
      }
      break;

    case "delete":
      {
        const path = join(__dirname, '../static', body.path)
        let File: fs.Stats
        try {
          File = fs.statSync(path)
        } catch (error) {
          ctx.throw(error)
        }
        if (File!.isFile()) {
          const resutl = await new Promise((resolve, reject) => {
            fs.rm(path, (err) => {
              if (err) reject(err)
              resolve(null)
            })
          })
          ctx.body = {
            code: 200,
            msg: '删除成功'
          }
        } else {
          ctx.body = {
            code: 0,
            msg: '操作出错'
          }
        }
      }
      break;
  }
})

export default router;
