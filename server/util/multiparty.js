/* jshint esversion:8 */
const multiparty = require("multiparty");
const Path = require("path");
const fs = require("fs");
const util = require("util");

module.exports = function(req) {
  let uploadPath = Path.join("static", "upload");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  let form = new multiparty.Form({ uploadDir: uploadPath });
  return new Promise((res, rej) => {
    form.parse(req, (err, fields, files) => {
      if (err) rej(err);

      files = Object.values(files)[0].map(file => {
        let oldpath = file.path;
        let newpath = oldpath.split("/");
        let name = Date.now() + file.originalFilename;
        newpath.pop();
        newpath = Path.join(newpath.join("/"), name);
        let link = newpath.split("/");
        link.shift();
        link = link.join("/");

        fs.renameSync(oldpath, newpath);
        return {
          originalFilename: file.originalFilename,
          name,
          path: link,
          link: newpath,
          size: file.size
        };
      });
      Object.keys(fields).forEach(key => {
        if (util.isArray(fields[key]) && key !== "file") fields[key] = fields[key][0];
      });

      res({ fields, files });
    });
  });
};
