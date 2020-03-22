import { IResolvers } from "apollo-server-koa";
import { ApolloCtx, ApolloMongoResult, UserInfo, fileDirList, editProduct, about } from "../typing/interface";
import { User } from "../mongoose/admin";
import DBs from "../mongoose/content"
import Crypto from "../util/crypto";
import fs from "fs";
import path from "path";
import util from "util"
import {Agent} from "../config"
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
      const result = await DBs.About.findOne({title:selectType,"content.webSite":webSite}).lean() as about
      console.log(result);
      
      return result?.content?.body || ""
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
      const result = await DBs.Head.update({ title: "Carousel" },
        { $set: { data: Path } },
        { upsert: true })
      return result
    },
    // 配置产品详情
    async setProduct(root, { arg }) {
      const { selectType, title, content_head, content_body, indexPic, carouselPic } = arg as editProduct
      const href = `/products/list/${title}`;
      // 保存路由
      DBs.SaveRouter({ rout: href, title });
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
      return productBody
    },
    // support
    async setProblem(root, { arg }) {
      const { title, movie, html, selectparentsUntil, selectparent } = arg;
      const href = `/support/problem/${title}`;
      DBs.SaveRouter({ rout: href, title });
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
      return data
    },
    // 配置经销商
    async setBuy(root, { arg }) {
      const {
        daqu,
        province,
        city,
        area,
        address,
        tel,
        linkman,
        phone,
        remark
      } = arg
      let stopn = 2;
      if (province === "黑龙江省") stopn = 3;
      const provinces = province
        .split("")
        .slice(0, stopn)
        .join("");
      const site = {
        parentsUntil: daqu,
        parent: provinces,
        title: `${city} （${provinces}销售服务中心)`,
        content: {
          area,
          address: provinces + city + area + address,
          tel,
          linkman,
          phone,
          remark
        },
        new: true
      };
      return await DBs.Buy_list.updateOne(
        { title: "buy_map" },
        { $push: { data: site } }
      );
    },
    // 添加案例，新闻
    async setCaseNews(root, { type, arg }) {
      const { pic, content, title, editType, } = arg;
      const inputType = type
      const dates = new Date();
      const href = `/${inputType}/${title}`;
      DBs.SaveRouter({ rout: href, title });
      const route = { rout: href, modifyTime: dates };
      DBs.Router.updateOne(
        { rout: route.rout },
        { $set: route },
        { upsert: true }
      );

      let collection = DBs.News;
      let collection_list = DBs.News_list;
      switch (inputType) {
        case "case":
          collection = DBs.Case;
          collection_list = DBs.Case_list;
          break;
      }
      let list = new collection({
        title,
        data: {
          name: (type as any)[editType],
          time: `${dates.getFullYear()}年${dates.getMonth() +
            1}月${dates.getDate()}日`,
          text: title,
          href,
          img: pic,
          linkText: "查看详情 >"
        }
      });
      list.save();

      let cont = new collection_list({
        title,
        data: content,
        date: dates,
        new: true
      });
      return await cont.save()
    }
  },
};

export default resolvers;
