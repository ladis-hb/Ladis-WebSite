import { ParameterizedContext } from "koa";
import fs from "fs-extra";
import path from "path";
import axios from "axios";

export default async (ctx: ParameterizedContext) => {
  const queryPath = decodeURI(ctx.path)
  const { stat, Path } = await getFileStatAndDown(queryPath);
  ctx.assert(stat, 400, ctx.path + " is no file");
  ctx.body = fs.createReadStream(Path);
};

export const getFileStatAndDown = async (fpath: string) => {
  fpath = decodeURI(fpath)
  const ladis = "http://www.ladis.com.cn";
  const enladis = "http://en.ladis.com.cn";
  // 获取请求素材路径
  const filePath = path.join(__dirname, "../static", fpath);
  // 文件获取状态
  let fileGetStat = true;
  const result = {
    stat: fileGetStat,
    Path: filePath,
  }
  // 如果不存在文件
  if (!fs.existsSync(filePath);) {
    const Path = path.dirname(filePath)
    // 判断文件夹是否存在，不存在则创建
    if (!fs.existsSync(Path)) fs.ensureDirSync(Path);
    // 创建文件写入流
    const fsStream = fs.createWriteStream(filePath);
    // 创建一个promise，监听到stream关闭返回true
    // 目的为阻塞流程，等待文件被下载再继续响应流程
    const em = new Promise(resolve => {
      fsStream.once("close", () => {
        console.log(`file ${fpath} is down`);
        resolve(true);
      });
    });
    // 从ladis中文获取资源
    try {
      const Response = await axios.get(ladis + fpath, { responseType: "stream" });
      Response.data.pipe(fsStream);
      await em;
    } catch (error) {
      // 获取失败则从ladis英文获取，
      try {
        const Response = await axios.get(enladis + fpath, { responseType: "stream" });
        Response.data.pipe(fsStream);
        await em;
      } catch (error) {
        // 获取失败则抛出错误
        fsStream.removeAllListeners()
        fileGetStat = false;
        console.error(new Error("ladis no file==" + fpath));
      }
    }
  }
  return result;
};
