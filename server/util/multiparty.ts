import multiparty from "multiparty";
import Path from "path";
import fs from "fs";
import util from "util";

export default (req:any) =>{
  let uploadPath = Path.join("static", "upload");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  let form = new multiparty.Form({ uploadDir: uploadPath });
  return new Promise((res, rej) => {
    form.parse(req, (err: any, fields: { [x: string]: any[]; }, files: ArrayLike<unknown> | { [s: string]: unknown; }) => {
      if (err) rej(err);

      files = (Object.values(files)[0] as any).map((file: { path: any; originalFilename: number; size: any; }) => {
        let oldpath = file.path;
        let newpath = oldpath.split("/");
        let name = Date.now() + file.originalFilename;
        newpath.pop();
        newpath = Path.join(newpath.join("/"), name.toString());
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
