import Multiparty from "../util/multiparty";
import { ParameterizedContext } from "koa";
import { uploadResult } from "../typing/interface";

export default async (ctx:ParameterizedContext) => {
  const UploadFile = await Multiparty(ctx.req) as uploadResult[]
  ctx.assert(UploadFile,402,"upload error")  
  ctx.body = {
    code: 200,
    data: UploadFile
  };
};
