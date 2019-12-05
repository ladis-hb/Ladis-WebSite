/* jshint esversion:8 */
const Koa = require("koa");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const router = require("./router/index");
const body = require("koa-body");
//const mongo = require("koa-mongo");
const error = require("koa-error");

const app = new Koa();

//注册mongo
//app.use(mongo({ db: "ladis" }));
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();  
});
app.use(error());
//注册router
app.use(body());
app.use(router.routes()).use(router.allowedMethods());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(app.env == "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // 绕过Koa的内置响应处理
    ctx.req.ctx = ctx; // 这在以后可能会有用，例如在nuxtServerInit或nuxt-stash中
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
  });
}

start();
