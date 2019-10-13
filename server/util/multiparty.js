/* jshint esversion:8 */
const multiparty = require("multiparty");
const Path = require("path");
const fs = require("fs");

module.exports = function({ path = "upload", request }) {
    let uploadPath = Path.join("static", path);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }
    let form = new multiparty.Form({ uploadDir: uploadPath });
    return new Promise((res, rej) => {
        form.parse(request, (err, fields, files) => {
            if (err) rej(err);
            res({ fields, files });
        });
    });
};
