/* jshint esversion:8 */
const jsonwebtoken = require("jsonwebtoken");
const secret = "ladisWebSite";
const tokenExpiresTime = 1000 * 60 * 60 * 5;

/**
 *
 *
 * @param {*} { payload, option }
 * @returns
 */
const JwtSign = ({ payload, option = {} }) => {
  if (typeof option != "object") option = {};
  option = Object.assign({ expiresIn: tokenExpiresTime }, option);
  let token = jsonwebtoken.sign(payload, secret, option);
  return token;
};

/**
 *
 *
 * @param {*} { token }
 * @returns
 */
const JwtVerify = token => {
  return jsonwebtoken.verify(token, secret);
};

module.exports = { JwtSign, JwtVerify, secret };
