/* jshint esversion:8 */
import { formatMD5 } from "../util/Format";
import { User } from "../mongoose/admin";
import { ParameterizedContext } from "koa";
import { UserInfo } from "../typing/interface";
import { JwtSign, JwtVerify } from "../util/Secret";
import { CryptoDncode } from "../util/crypto";

export default async (ctx: ParameterizedContext) => {
  switch (ctx.params.id) {
    case "login":
      {
        const { user, passwd } = ctx.request.body as UserInfo;
        const result = <UserInfo>await User.findOne({ $or: [{ user }, { mail: user }] }).lean();
        if (!result){
          throw new Error("用户未注册");
        }
        // 
        const CroPasswd = CryptoDncode(result.passwd).toString()
        console.log({result,CroPasswd,query:ctx.request.body});
        
        if (result.passwd !== CroPasswd)
          throw new Error("密码错误，请核对密码");
        if (!result.stat) throw new Error("账户未启用，请联系管理员启用");

        if (result.passwd === formatMD5(passwd)) {
          console.log("login");
          result.passwd = ""
          const token = await JwtSign(result)
          ctx.body = { token, user: result.user };
        }
      }
      break;
    case "user":
      {
        const token = ctx.cookies.get("auth._token.local")
        const tokenSlice = <string>token?.slice(9, token.length)
        ctx.body = await JwtVerify(tokenSlice)
      }

      break;
    case "logout":
      ctx.body = { stat: true, msg: "success" };
      break;
  }
};
