import multiparty from "multiparty";
import Path from "path";
import fs from "fs";
import util from "util";
import { IncomingMessage } from "http"

interface uploadFile {
  fieldName: string
  originalFilename: string
  path: string
  headers: {
    'content-disposition': string
    'content-type': string
  },
  size: number
}

export default (req: IncomingMessage) => {
  // 上传路径/static/upload
  const uploadPath = Path.join("static", "upload");
  // 检查目录是否存在
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  // 新建mul...
  const form = new multiparty.Form({ uploadDir: uploadPath });
  // 构建 Pro
  return new Promise((resolve, reject) => {
    // 解析上传文件
    form.parse(req, (err, fields: any, files: any) => {
      if (err) reject(err);
      // fields携带的是附带信息,files是上传文件数组
      const Files:uploadFile[] = files.files
    const SaveFiles =  Files.map(file=>{
        // 把上传的文件名称添加毫秒数
        const flieName = <string>file.path.split("/").pop()
        const flieNameNew = `${Date.now()}-${file.originalFilename}`
        const newPath = file.path.replace(flieName,flieNameNew)
        fs.renameSync(file.path,newPath)
        //获取文件路径相对链接
        const link = newPath.replace("static/","")
        return {
          originalFilename: file.originalFilename,
          name:flieNameNew,
          path: link,
          link: newPath,
          size: file.size
        };
      })
      resolve(SaveFiles)

      /*  files = (Object.values(files)[0] as any).map((file: { path: any; originalFilename: number; size: any; }) => {
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
 
       resolve({ fields, files }); */
    });
  });
};
