import { User } from "../mongoose/admin";
import { ParameterizedContext } from "koa";
import { UserInfo } from "../typing/interface";
import { JwtSign, JwtVerify } from "../util/Secret";
import Crypto from "../util/crypto";

export default async (ctx: ParameterizedContext) => {
  switch (ctx.params.id) {
    case "login":
      {
        const { user, passwd } = ctx.request.body as UserInfo;
        console.log({query:ctx.request.body});
        
        const result = <UserInfo>await User.findOne({ $or: [{ user }, { mail: user }] }).lean();
        if (!result){
          throw new Error("用户未注册");
        }
        if (!result.stat) {
          throw new Error("账户未启用，请联系管理员启用");
        }
        if (result.passwd === Crypto.Encrypt(passwd)){
          result.passwd = ""
          const token = await JwtSign(result)
          ctx.body = { token, user};
        }else{
          throw new Error("密码错误，请核对密码");
        }
         
        
      }
      break;
    case "user":
      {
        const token = ctx.req.headers.authorization
        const tokenSlice = <string>token?.slice(9, token.length)
        const {user} = <UserInfo>await JwtVerify(tokenSlice)
        ctx.body = {user}
      }

      break;
    case "logout":
      ctx.body = { stat: true, msg: "success" };
      break;
  }
};
