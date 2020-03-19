/* jshint esversion:8 */
import { validation_jwt_user } from "../util/Format";
import fs from "fs";
import Multiparty from "../util/multiparty";
import { ParameterizedContext } from "koa";

export default async (ctx:ParameterizedContext) => {
  let id = ctx.params.id;
  // console.log(`route in upload,id:${id},Method:${ctx.method}`);
  let UploadFile = await Multiparty(ctx.req);
  ctx.body = {
    code: 200,
    data: (UploadFile as any).files
  };
};
