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

export const JwtSign = (payload: string | object | Buffer, options?: jsonwebtoken.SignOptions) => {
  const result: Promise<string> = new Promise((resolve, reject) => {
    const opt = Object.assign({ expiresIn: tokenExpiresTime }, options || {});
    jsonwebtoken.sign(payload, secret, opt, (err, encodeURI) => {
      if (err) reject(err)
      resolve(encodeURI as string)
    })
  })
  return result
};

/**
 *解密函数
 *
 * @param {*} { token }
 * @returns
 */

export const JwtVerify = <T>(token: string) => {
  const result = new Promise<T>((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, decode) => {
      if (err) reject(err)
      resolve(decode as any)
    })
  })
  return result
};
