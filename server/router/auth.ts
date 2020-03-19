/* jshint esversion:8 */
import { JwtSign, JwtVerify } from "../Secret";
import { formatMD5 } from "../util/Format";
import { User } from "../mongoose/admin";
import { ParameterizedContext } from "koa";

export default async (ctx:ParameterizedContext) => {
  switch (ctx.params.id) {
    case "login":
      {
        //ctx.body = { token: JwtSign({ payload: ctx.request.body }) };

        let { user, password: passwd } = ctx.request.body;
        let result = await User.findOne({ $or: [{ user }, { mail: user }] }) as any;
        if (!result) throw new Error("用户未注册");
        if (result.passwd !== formatMD5(passwd))
          throw new Error("密码错误，请核对密码");
        if (!result.stat) throw new Error("账户未启用，请联系管理员启用");

        if (result.passwd === formatMD5(passwd)) {
          console.log("login");
          ctx.body = { token: JwtSign({ payload: ctx.request.body }) };
        }
      }
      break;
    case "user":
      let token = <string>ctx.cookies.get("auth._token.local");
      let Users;
      try {
        Users = JwtVerify(token.slice(9, token.length));
      } catch (error) {
        ctx.body = "token error";
      }
      ctx.body = Users;
      break;
    case "logout":
      ctx.body = { stat: true, msg: "success" };
      break;
  }
};
