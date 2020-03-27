/* jshint esversion:8 */
import Router from "koa-router";
import Auth from "./auth";
import Upload from "./upload";
import Edit from "./edit";
import Docment from "./Docment";

import fs from "fs"
import Send from "koa-send"
import path from "path"
import { ParameterizedContext } from "koa";

const router = new Router();
//
router.get("/down/:title", down);
router.get("/upload/:title", down);

router.post("/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/edit/:id", Edit);
router.get("/api/:id", Docment);


async function down (ctx:ParameterizedContext<any, Router.IRouterParamContext<any, {}>>){
    const filePath: string = "/static/" + ctx.path
    //const paresPath = path.join(__dirname,"../../",filePath)
    //console.log({filePath,paresPath});
    
    //ctx.assert(!fs.existsSync(paresPath), 400, "no files")
    ctx.attachment(filePath)
    await Send(ctx, filePath)
}

export default router;
