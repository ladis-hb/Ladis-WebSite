import Koa from "koa";
import consola from "consola";
const { Nuxt, Builder } = require("nuxt");
import router from "./router/index";
import body from "koa-body";
import cors from '@koa/cors';
import logger from "koa-logger";
import ApolloServer from "./apollo/apollo"
import Query from "./Event/Event"
const app = new Koa();

// 挂载全局缓存、事件到app
Query.attach(app)
//监听apollo api
ApolloServer.applyMiddleware({ app, path: "/graphql" })
//注册mongo
app.use(logger())
//app.use(mongo({ db: "ladis" }));
app.use(cors({}));
//注册router
app.use(body());

// attch rout
app.use(router.routes()).use(router.allowedMethods());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(app.env == "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 9006
  } = nuxt.options.server;
  // ready
  await nuxt.ready();
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // 绕过Koa的内置响应处理
    ctx.request.ctx = ctx; // 这在以后可能会有用，例如在nuxtServerInit或nuxt-stash中
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}/admin`,
      badge: true
    });
  });
}

start();
