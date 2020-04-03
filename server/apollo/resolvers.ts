import { IResolvers } from "apollo-server-koa";
import { User } from "../mongoose/admin";
import DBs from "../mongoose/content"
import Crypto from "../util/crypto";
import fs from "fs";
import path from "path";
import util from "util"
import {Agent} from "../config"
import { ApolloCtx, ApolloMongoResult, UserInfo, fileDirList,cases, caseList, buy, about, buyList } from "typing";
const resolvers: IResolvers = {
  Query: {
    // 获取upload文件夹文件列表
    async getUploadFiles(root, { filter }) {
      // 目录地址
      const dir = path.join(__dirname, "../../static/upload")
      // 转换callback to promise
      const readdir = util.promisify(fs.readdir)
      // 默认结果
      const data: fileDirList = { files: [], size: 0, msg: "" }
      const result = await readdir(dir).then(files => {
        if (!filter || filter === "") {
          data.files = files.map(file => `/upload/${file}`);
        } else {
          data.files = files.filter(file => file.includes(filter)).map(file => `/upload/${file}`);
        }
        data.size = data.files.length
        return data
      }).catch(e => {
        data.msg = e.message
        return data
      })
      return result
    },
    // 获取代理商列表
    getAgents(){
      return Agent
    },
    // 获取代理商about
    async getAbouts(root,{selectType,webSite}){
      const result = await DBs.About.findOne({type:selectType,webSite:webSite}).lean() as about
      return result?.content
    },
    // 获取经销商列表
    async getbuys(){
      const result:buyList[] = await DBs.Buy_list.find().lean()
      return result
    },
    // 获取案例列表
    async getCases(){
      const result:cases[] = await DBs.Case.find().lean()
      return result
    },
    //
    async getCase(root,{title}){
      const result:cases = await DBs.Case.findOne({text:title}).lean() as any
      return result
    },
    //
    async getCaseList(root,{title}){
      const result:caseList = await DBs.Case_list.findOne({title}).lean() as caseList
      return result
    },
    // 获取案例列表
    async getNews(){
      const result:cases[] = await DBs.News.find().lean()
      return result
    },
    //
    async getNew(root,{title}){
      const result:cases = await DBs.News.findOne({text:title}).lean() as any
      return result
    },
    //
    async getNewList(root,{title}){
      const result:caseList = await DBs.News_list.findOne({title}).lean() as caseList
      return result
    }

  },

  Mutation: {
    // 注册用户
    async register(root, { user, passwd, mail }) {
      const userInfo = await User.findOne({ $or: [{ user }, { mail }] });
      if (userInfo) {
        const result: ApolloMongoResult = {
          ok: 0,
          msg: "账号有重复,请重新编写账号",
        };
        return result;
      }
      const DateTime = Date.now();
      const BcryptUser: UserInfo = {
        user,
        passwd: Crypto.Encrypt(passwd),
        mail,
        DateTime: new Date(DateTime),
        stat: true,
        name: user,
      };
      const dbUser = new User(BcryptUser);
      return await dbUser
        .save()
        .then(() => {
          return { ok: 1, msg: "账号注册成功" };
        })
        .catch(e => console.log(e));
    },
    // 配置轮播图
    async setCarousel(root, { Path }) {
      const result = {ok:0} /* await DBs.Head.update({ title: "Carousel" },
        { $set: { data: Path } },
        { upsert: true }) */
      return result
    },
    // 配置产品详情
    async setProduct(root, { arg }) {
     /*  const { selectType, title, content_head, content_body, indexPic, carouselPic } = arg as editProduct
      const href = `/products/list/${title}`;
      // 保存路由
      // 添加主类 
      await DBs.Product.updateOne(
        { title: selectType },
        { $addToSet: { data: { title, href, img: indexPic } } },
        { upsert: true }
      );
      // 写入子类
      const product_list = new DBs.Product_list({
        parant: selectType,
        title,
        date: new Date(),
        data: {
          content_head,
          content_body,
          img: carouselPic
        }
      });
      const productBody = await product_list.save()
      return productBody */
    },
    // support
    async setProblem(root, { arg }) {
      /* const { title, movie, html, selectparentsUntil, selectparent } = arg;
      const href = `/support/problem/${title}`;
      const obj = {
        title,
        href,
        date: new Date(),
        parentsUntil: selectparentsUntil,
        parent: selectparent,
        movie,
        html
      };
      if (html === "输入") obj.movie = movie;
      else obj.html = html;
      const support_list = new DBs.Support_list(obj);
      return await support_list.save();
    },
    async setSoft(root, { arg }) {
      const {
        selectSystem,
        title,
        platform,
        selectLanguage,
        version,
        update,
        file
      } = arg;
      let fileType = "soft";
      if (file.includes(".pdf")) fileType = "pdf";
      const f = fs.statSync(path.join("static", file));
      const obj = {
        type: fileType,
        title,
        date: new Date(),
        platform,
        language: selectLanguage,
        size: f.size / 1024 / 1024 + "MB",
        version,
        updateReason: update,
        down: file,
        href: file
      };

      const data: ApolloMongoResult = await DBs.Support.updateOne(
        { title: selectSystem },
        { $addToSet: { data: obj } },
        { upsert: true }
      ).lean() as any
      return data */
    },
    // 配置经销商
    async setBuy(root, { arg }) {
       const ad:buy = arg
       console.log(arg);
       
       const result = await DBs.Buy_list.updateOne({link:ad.link},{$set:arg},{upsert:true})
       return result
    },
    // 添加案例，新闻
    async setCaseNews(root, { arg }) {
      const { newsContent,newListContent }:{ newsContent:cases,newListContent:caseList } = arg;
      const {table,link} = newsContent
      await (DBs as any)[table as string].updateOne({link},{$set:newsContent},{upsert:true})
      const result = await (DBs as any)[table+"_list"].updateOne({link},{$set:newListContent},{upsert:true})
      return result
    },
    // 删除案例
    async delCase(root,{title}){
      await DBs.Case_list.deleteMany({title})
      const result = await DBs.Case.deleteMany({text:title})
      return result
    },
    // 删除案例
    async delNew(root,{title}){
      await DBs.News_list.deleteMany({title})
      const result = await DBs.News.deleteMany({text:title})
      return result
    },
    // 配置about
    async setAbout(root,{arg}:{arg:about}){
      const result = await DBs.About.updateOne({type:arg.type,webSite:arg.webSite},{$set:arg},{upsert:true})
      return result
    }
  },
};

export default resolvers;
