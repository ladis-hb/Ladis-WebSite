/* jshint esversion:8 */
const md5 = require("md5");
const { JwtSign, JwtVerify } = require("../Secret");
const { Collection } = require("../config");
const { formatMD5 } = require("../util/Format");

module.exports = async (ctx, next) => {
  switch (ctx.params.id) {
    case "login":
      {
        let body = { stat: false, code: 0, msg: "", data: {} };
        let { user, passwd } = ctx.query;
        let result = await ctx.db
          .collection(Collection.user)
          .findOne({ $or: [{ user }, { mail: user }] });
        if (!result) {
          body.msg = "用户未注册，是否注册？";
          return (ctx.body = body);
        }
        if (!result.stat) {
          body.msg = "账户未启用，请联系管理员启用";
          body.code = 1;
          return (ctx.body = body);
        }
        if (result.passwd !== formatMD5(passwd)) {
          body.msg = "密码错误，请核对密码";
          body.code = 3;
          return (ctx.body = body);
        }
        if (result.passwd === formatMD5(passwd)) {
          body.msg = "密码效验正确";
          body.code = 5;
          body.data = {
            user,
            token: JwtSign({ payload: ctx.query })
          };
          return (ctx.body = body);
        }
        ctx.body = {
          msg: "未知错误"
        };
      }
      break;
    case "register":
      {
        let { user, mail, passwd } = ctx.query;
        let scUser = await ctx.db
          .collection(Collection.user)
          .find({ $or: [{ user }, { mail }] })
          .project({ user: 1, mail: 1 })
          .toArray();
        if (scUser.length > 0) {
          for (let u of scUser) {
            if (u.user === user)
              return (ctx.body = { stat: false, msg: "账号名重复" });
            if (u.mail === mail)
              return (ctx.body = { stat: false, msg: "邮箱重复" });
          }
        }
        let userInfo = Object.assign(ctx.query, {
          passwd: formatMD5(passwd),
          ck_passwd: "",
          Group: "user",
          DateTime: new Date(),
          stat: false,
          IP: ctx.ip
        });
        await ctx.db.collection(Collection.user).insertOne(userInfo);
        ctx.body = { stat: true, msg: "注册成功，请尽快登录" };
      }
      break;
  }
  await next;
};
