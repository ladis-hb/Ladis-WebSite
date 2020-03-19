/* jshint esversion:8 */
import jsonwebtoken from "jsonwebtoken";
export const secret = "ladisWebSite";
const tokenExpiresTime = 1000 * 60 * 60 * 5;

/**
 *加密函数
 *payload为加密的数据，数据类型string or object
 * @param {*} { payload, option }
 * @returns
 */
export const JwtSign = ({ payload, option = {} }: any) => {
  if (typeof option != "object") option = {};
  option = Object.assign({ expiresIn: tokenExpiresTime }, option);
  let token = jsonwebtoken.sign(payload, secret, option);
  return token;
};

/**
 *解密函数
 *
 * @param {*} { token }
 * @returns
 */
export const JwtVerify = (token: string) => {
  return jsonwebtoken.verify(token, secret);
};
