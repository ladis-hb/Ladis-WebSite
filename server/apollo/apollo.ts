import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ParameterizedContext } from "koa";
import { UserInfo } from "../typing/interface";
import { JwtVerify } from "../util/Secret";

export default new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: async ({ ctx }: { ctx: ParameterizedContext }) => {
    // 获取Token
    const token = ctx.cookies.get("auth._token.local");
    // 没有token则检查body，注册和重置页面的请求则通过
    if (!token || token === "false") {
      // 获取gragpl
      const { operationName } = ctx.request.body;
      const guestQuery = ["registerUser"];
      if (operationName && guestQuery.includes(operationName))
        return { user: "guest", loggedIn: false };
      else throw new Error("query error");
    }
    // 解构token
    const user:UserInfo = await JwtVerify((<string>token).replace("bearer%20", ""));
    //
    if (!user || !user.user) throw new Error("you must be logged in");
    return { ...user, loggedIn: true };
  }
});
