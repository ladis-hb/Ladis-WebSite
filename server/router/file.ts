import { ParameterizedContext } from "koa";
import fs from "fs-extra";
import path from "path";
import axios from "axios";

export default async (ctx: ParameterizedContext) => {
  const { stat, Path } = await getFileStatAndDown(ctx.path);
  ctx.assert(stat, 400, ctx.path + " is no file");
  ctx.body = fs.createReadStream(Path);
};

export const getFileStatAndDown = async (fpath: string) => {
  const ladis = "http://www.ladis.com.cn";
  const enladis = "http://en.ladis.com.cn";
  // 获取请求素材路径
  const filePath = path.join(__dirname, "../../static", fpath);
  // 判断文件是否存在
  const isFile = fs.existsSync(filePath);
  // 文件获取状态
  let fileGetStat = true;
  // 如果不存在文件
  if (!isFile) {
    const Path = filePath.replace(<string>filePath.split("/").pop(), "");
    // 判断文件夹是否存在，不存在则创建
    if (!fs.existsSync(Path)) fs.ensureDirSync(Path);
    // 从ladis中文获取资源
    try {
      const Response = await axios.get(ladis + fpath, { responseType: "stream" });
      Response.data.pipe(fs.createWriteStream(filePath));
    } catch (error) {
      // 获取失败则从ladis英文获取，
      try {
        const Response = await axios.get(enladis + fpath, { responseType: "stream" });
        Response.data.pipe(fs.createWriteStream(filePath));
      } catch (error) {
        // 获取失败则抛出错误
        fileGetStat = false;
        throw new Error("ladis no file");
      }
    }
  }
  return {
    stat: fileGetStat,
    Path: filePath,
  };
};
