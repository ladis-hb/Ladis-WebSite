/* jshint esversion:8 */
import crypto from "crypto";
import util from "util";
import { key,Collection } from "../config";
import { JwtVerify } from "../Secret";
import Multiparty from "../util/multiparty";

export const validation_jwt_user = (user: string, token: string) => {
  if (!user || user === "") return false;
  if (!token || token === "") return false;
  let { user: u } = JwtVerify(token) as any;
  if (u === user) return true;
  else return false;
};
export const SerizeFormattoObject = async (ctx: { req: any; }) => {
  //解构format,fields是附加数据，files是上传文件，嵌套解构files,取出文件实体
  let { fields, files } = await Multiparty({ request: ctx.req }) as any;
  //迭代fields，值是单个数组的替换为字符串
  let field = SerizeFilesArraytoString(fields);
  //解构files，
  Object.entries(files).forEach(file => {
    const [key, val ] = file;
    const value = val as any
    //console.log(value);

    if (value.length < 2) {
      value[0].path = pathto(value[0].path);
      files[key] = value[0];
    } else {
      files[key] = value.map((f: { path: any; }) => {
        //f.path = pathto(f.path);
        return pathto(f.path);
      });
    }
  });
  return {
    files,
    fields: field
  };

  function pathto(path: string) {
    const filePath = path.split("/");
    filePath.shift();
    return "/" + filePath.join("/");
  }
};

/**
 *
 *
 * @param {*} files
 * @returns
 */
export const SerizeFilesArraytoString = (files: { [x: string]: any[]; }) => {
  Object.keys(files).forEach(key => {
    if (util.isArray(files[key]) && key !== "file") files[key] = files[key][0];
  });
  return files;
};
/**
 *
 *
 * @param {*} status error:404,        success:200,        info:304,        warn:0
 * @param {*} msg  string
 * @param {*} data body data
 * @returns
 */
export const formartBody = (status: string | number, msg: string, data: {}) => {
  let statu = {
    error: 404,
    success: 200,
    info: 304,
    warn: 0
  };
  let body = data || {};
  msg = typeof msg == "string" ? msg : "";
  return { code: (statu as any)[status], msg: msg, data: body };
};

/**
 *
 *
 * @param {*} passwd 密码
 * @returns 减去后加的随机码，还原纯数字
 */
export const formatPasswd = (passwd: string) => {
  if (typeof passwd == "string") {
    const buf = Buffer.from(passwd, "base64").toString()
    return buf.slice(0, passwd.length - 14)
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
export const formatMD5 = (passwd: any) => {
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
export const formatDate = () => {
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
/* const Validation_user = async (ctx: { db: { collection: (arg0: any) => { (): any; new(): any; findOne: { (arg0: { user: any; token: any; }): any; new(): any; }; }; }; }, data: { user: any; token: any; }) => {
  let { user, token } = data;
  let s = await ctx.db
    .collection(Collection..DB_user_users)
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
const Validation_root_Group = async (ctx: { db: { collection: (arg0: any) => { (): any; new(): any; findOne: { (arg0: { user: any; userGroup: string; }): any; new(): any; }; }; }; }, operationUser: any) => {
  let validation = await ctx.db
    .collection(config.DB_user_users)
    .findOne({ user: operationUser, userGroup: "root" });
  if (validation) return true;
  else return false;
};
const ObjectId = mongodb.ObjectId;
 */
export const StrToUpperCase = (str: string) => {
  const strArray = str.split("")
  return str.replace(strArray[0], strArray[0].toUpperCase());
};

