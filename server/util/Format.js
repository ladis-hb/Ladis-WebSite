/* jshint esversion:8 */
const crypto = require("crypto");
const { key } = require("../config");
const mongodb = require("mongodb");
const { JwtSign, JwtVerify } = require("../Secret");

const validation_jwt_user = (user, token) => {
  if (!user || user === "") return false;
  if (!token || token === "") return false;
  let { user: u } = JwtVerify(token);
  if (u === user) return true;
  else return false;
};
/**
 *
 *
 * @param {*} status error:404,        success:200,        info:304,        warn:0
 * @param {*} msg  string
 * @param {*} data body data
 * @returns
 */
const formartBody = (status, msg, data) => {
  let statu = {
    error: 404,
    success: 200,
    info: 304,
    warn: 0
  };
  let body = data || {};
  msg = typeof msg == "string" ? msg : "";
  return { code: statu[status], msg: msg, data: body };
};

/**
 *
 *
 * @param {*} passwd 密码
 * @returns 减去后加的随机码，还原纯数字
 */
const formatPasswd = passwd => {
  if (typeof passwd == "string") {
    return [...Buffer.from(passwd, "base64").toString()]
      .slice(0, passwd.length - 14)
      .join("");
  } else {
    return false;
  }
};

/**
 *
 *
 * @param {*} passwd 纯数字密码
 * @returns  md5加密
 */
const formatMD5 = passwd => {
  var md5 = crypto.createHash("md5");
  md5.update(String(passwd));
  md5.update(key);
  return md5.digest("hex");
};

/**
 *
 *
 * @returns 返回格式化的日期 1990-01-01 12:12:12
 */
const formatDate = () => {
  let dates = new Date();
  let date = `${dates.getFullYear()}/${dates.getMonth() +
    1}/${dates.getDate()}`;
  let time = `${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}`; //:${dates.getMilliseconds()}`;
  return `${date} ${time}`;
};

/**
 *
 *
 * @param {*} ctx   ctx句柄
 * @param {*} data  包含token and user
 * @returns
 */
const Validation_user = async (ctx, data) => {
  let { user, token } = data;
  let s = await ctx.db
    .collection(config.DB_user_users)
    .findOne({ user, token });
  if (s) status = true;
  else status = false;
  let result = {
    status,
    user,
    userGroup: s.userGroup
  };
  return result;
};
const Validation_root_Group = async (ctx, operationUser) => {
  let validation = await ctx.db
    .collection(config.DB_user_users)
    .findOne({ user: operationUser, userGroup: "root" });
  if (validation) return true;
  else return false;
};
/* 
ObjectId
*/
const ObjectId = mongodb.ObjectId;

module.exports = {
  formartBody,
  formatPasswd,
  formatMD5,
  formatDate,
  Validation_user,
  ObjectId,
  Validation_root_Group,
  validation_jwt_user
};
