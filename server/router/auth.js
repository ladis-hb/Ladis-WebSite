/* jshint esversion:8 */
const { JwtSign, JwtVerify } = require("../Secret");
const { formatMD5 } = require("../util/Format");
const { User } = require("../mongoose/admin");

module.exports = async ctx => {
  switch (ctx.params.id) {
    case "login":
      {
        //ctx.body = { token: JwtSign({ payload: ctx.request.body }) };

        let { user, password: passwd } = ctx.request.body;
        let result = await User.findOne({ $or: [{ user }, { mail: user }] });
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
      let token = ctx.cookies.get("auth._token.local");
      let { user } = JwtVerify(token.slice(9, token.length));
      ctx.body = { user };
      break;
    case "logout":
      ctx.body = { stat: true, msg: "success" };
      break;
  }
};