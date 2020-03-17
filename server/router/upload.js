/* jshint esversion:8 */
const { validation_jwt_user } = require("../util/Format");
const fs = require("fs");
const Multiparty = require("../util/multiparty");

module.exports = async (ctx, next) => {
  let id = ctx.params.id;
  // console.log(`route in upload,id:${id},Method:${ctx.method}`);
  let UploadFile = await Multiparty(ctx.req);
  ctx.body = {
    code: 200,
    data: UploadFile.files
  };

  await next;
};
