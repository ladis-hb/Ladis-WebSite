/* jshint esversion:8 */
const { validation_jwt_user } = require("../util/Format");
const fs = require("fs");
const Multiparty = require("../util/multiparty");

module.exports = async (ctx, next) => {
  let id = ctx.params.id;
  console.log(`route in upload,id:${id},Method:${ctx.method}`);

  let UploadFile = await Multiparty(ctx.req);
  let { user, token } = UploadFile.fields;
  if (!validation_jwt_user(user, token)) {
    UploadFile.files.forEach(file => {
      fs.unlinkSync(file.path);
    });
    return (ctx.body = {
      stat: false,
      error: "tokenValidationError",
      msg: "效验错误，token已过期或错误，请重新登录已刷新Token"
    });
  }
  ctx.body = {
    code: 200,
    data: UploadFile.files
  };

  await next;
};
