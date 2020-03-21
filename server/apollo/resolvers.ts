import { IResolvers } from "apollo-server-koa";
import { ApolloCtx, ApolloMongoResult, UserInfo } from "../typing/interface";
import { User } from "../mongoose/admin";
import Crypto from "../util/crypto";
import fs from "fs";
import path from "path";
const resolvers: IResolvers = {
  Query: {
    getUploadFiles(root, { filter }) {
      const files = fs.readdirSync(path.join(__dirname, "../../static/upload"));
      if (!filter || filter === "") {
        const paresFiles = files.map(file => `/upload/${file}`);
        return { files: paresFiles };
      } else {
        return files.filter(file => file.includes(filter)).map(file => `/upload/${file}`);
      }
    }
  },

  Mutation: {
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
      console.log({ passwd, croPw: Crypto.Encrypt(passwd) });

      const dbUser = new User(BcryptUser);
      return await dbUser
        .save()
        .then(() => {
          return { ok: 1, msg: "账号注册成功" };
        })
        .catch(e => console.log(e));
    },
  },
};

export default resolvers;
