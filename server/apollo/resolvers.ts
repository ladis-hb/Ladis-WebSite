import { IResolvers } from "apollo-server-koa";
import { ApolloCtx, ApolloMongoResult, UserInfo } from "../typing/interface";
import { User } from "../mongoose/admin";
import { CryptoEncode } from "../util/crypto";
const resolvers: IResolvers = {
    Query: {
        // 节点状态
        async Node(root, { IP, Name }, ctx: ApolloCtx) {

            return ""
        }
    },

    Mutation: {
        async register(root, { user, passwd, mail }) {
            const userInfo = await User.findOne({ $or: [{ user }, { mail }] });
            if (userInfo) {
                const result: ApolloMongoResult = {
                    ok: 0,
                    msg: "账号有重复,请重新编写账号"
                }
                return result
            }
            const DateTime = Date.now()
            const BcryptUser: UserInfo = { user, passwd: CryptoEncode(passwd), mail, DateTime: new Date(DateTime), stat: true, name: user }
            const dbUser = new User(BcryptUser)
            return await dbUser.save()
                .then(() => {
                    return { ok: 1, msg: "账号注册成功" };
                })
                .catch((e) => console.log(e));

            /* if (userStat) return { ok: 0, msg:  };
            const user = Object.assign(arg, { passwd: await BcryptDo(arg.passwd) });
            const User = new Users(user);
            return await User.save()
                .then(() => {
                    return { ok: 1, msg: "账号注册成功" };
                })
                .catch((e) => console.log(e)); */
        }
    }
};

export default resolvers 