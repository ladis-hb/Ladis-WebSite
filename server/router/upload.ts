import { ParameterizedContext } from "koa";
import { uploadResult } from "typing";
import multiparty from "multiparty";
import Path from "path";
import fs from "fs-extra";
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

export default async (ctx: ParameterizedContext) => {
  const UploadFile = await Multiparty(ctx.req) as uploadResult[]
  ctx.assert(UploadFile, 402, "upload error")
  ctx.body = {
    code: 200,
    data: UploadFile
  };
};

function Multiparty(req: IncomingMessage) {
  // 上传路径/static/upload
  const uploadPath = Path.join(__dirname, "../static", "upload");
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
      const Files: uploadFile[] = files.files
      const SaveFiles = Files.map(file => {
        //
        const flieNameNew = `${new Date().toLocaleString().replace(/( |:|:)/g, "-")}__${file.originalFilename}`
        const newPath = file.path.replace(Path.basename(file.path), flieNameNew)
        fs.renameSync(file.path, decodeURI(newPath))
        //获取文件路径相对链接
        const link = `/upload/${flieNameNew}`
        return {
          originalFilename: file.originalFilename,
          name: flieNameNew,
          path: link,
          link: link,
          size: file.size
        };
      })
      resolve(SaveFiles)
    });
  });
};
