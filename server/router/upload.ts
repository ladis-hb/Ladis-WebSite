import Multiparty from "../util/multiparty";
import { ParameterizedContext } from "koa";

export default async (ctx:ParameterizedContext) => {
  const UploadFile = await Multiparty(ctx.req);
  ctx.assert(UploadFile,402,"upload error")  
  ctx.body = {
    code: 200,
    data: UploadFile
  };
};
