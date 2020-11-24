import Koa from "koa";
import consola from "consola";
import router from "./router/index";
import body from "koa-body";
import cors from '@koa/cors';
import logger from "koa-logger";
import ApolloServer from "./apollo/apollo"
import Query from "./Event/Event"
const app = new Koa();
//注册mongo
app.use(logger())
app.use(cors({}));
// 挂载全局缓存、事件到app
Query.attach(app)
//监听apollo api
ApolloServer.applyMiddleware({ app, path: "/graphql" })

//注册router
app.use(body());

// attch rout
app.use(router.routes()).use(router.allowedMethods());

const port = 9006
async function start() {
  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://0.0.0.0:${port}`,
      badge: true
    });
  });
}

start();
