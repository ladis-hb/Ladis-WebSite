import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ParameterizedContext } from "koa";
import { JwtVerify } from "../util/Secret";
import { UserInfo } from "typing";

export default new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: async ({ ctx }: { ctx: ParameterizedContext }) => {
    // 获取Token
    const token = ctx.request.header.authorization
    // console.log({ ctx: ctx.request.header.authorization, token });
    // 没有token则检查body，注册和重置页面的请求则通过
    if (!token || token === "false") {
      // 获取gragpl
      const { operationName } = ctx.request.body;
      const guestQuery = ["registerUser"];
      if (operationName && guestQuery.includes(operationName))
        return { user: "guest", loggedIn: false };
      else {
        console.log('apollo 请求没有携带cookie');
        throw new Error("query error");
      }
    } else {
      const user: UserInfo = await JwtVerify(token.replace(/(^Bearer|bearer)/ig, "").trim());
      if (!user || !user.user) {
        console.log("you must be logged in");
        throw new Error("you must be logged in");
      }
      return { ...user, loggedIn: true };
    }

  }
});
