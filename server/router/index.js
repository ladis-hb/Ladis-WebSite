/* jshint esversion:8 */
const Router = require("koa-router");
const Admin = require("./admin");
const Auth = require("./auth");
const Upload = require("./upload");
const Edit = require("./edit");
const { StrToUpperCase } = require("../util/Format");
const router = new Router();

const DB = require("../mongoose/content");

router.get("/administrator/:id", Admin);
router.post("/api/auth/:id", Auth);
router.get("/api/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/edit/:id", Edit);
router.get("/api/:id", async ctx => {
  const { id } = ctx.params;
  console.log(id);
  switch (id) {
    //获取官网主页轮播的新闻列表
    case "Get_index_news_list":
      let result1 = await DB.News_list.find()
        .limit(10)
        .exec();
      ctx.body = result1;
      break;
    //获取page头文件
    case "Head":
      let head = await DB.Head.findOne({ title: id }); //mongo.findOne({ title: id });
      Head = json2html(head.data);
      ctx.body = Head;
      break;
    //获取产品信息分类列表
    case "Products_list":
      let get_products_list = await DB.Page.findOne({ title: "products_asid" });
      ctx.body = get_products_list.data;
      break;
    //获取所有产品信息
    case "Products_all":
      let Products_all = await DB.Product.findOne({ title: "All" }); // mongo_Products.findOne({ title: "All" });
      ctx.body = Products_all.data;
      break;
    //获取软件下载列表
    case "Get_support_down_list":
      let Get_support_down_list = await DB.Support.find({
        parent: ctx.query.table
      });
      ctx.body = Get_support_down_list;
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_news_list":
      {
        let result = await DB.News.find()
          .sort({ "data.time": -1 })
          .exec();
        ctx.body = result;
      }
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_case_list":
      {
        let result = await DB.Case.find()
          .sort({ "data.time": -1 })
          .exec();
        ctx.body = result;
      }
      break;
    //获取经销商列表子类
    case "Get_buy_li":
      {
        let city = ctx.query.city;
        let { data } = await DB.Buy_list.findOne();
        let result = data.filter(el => el.parent === city);
        ctx.body = result;
      }
      break;
    //Generate 静态化时，路由表携带载荷
    case "GET_router":
      let i = 0;
      let router = await DB.Router.find();

      let rout_result = router.filter(el => !element.rout.includes("店"));

      let Generate_router = rout_result.map(async ({ rout }) => {
        let routers = {
          route: rout,
          payload: { data: null, head: null, asid: null, args: null }
        };
        let route_path = rout.split("/"); //.shift(); //route.shift();
        route_path.shift();
        //console.log(route_path);

        //取得路由=》页面名称
        let title = route_path.pop();
        let table = StrToUpperCase(route_path[0]);
        let table_list = StrToUpperCase(route_path.join("_"));
        let data = { data: null },
          head = null,
          asid = { data: null },
          arg = {};

        switch (table) {
          case "Support":
            let tables = `${table}_list`;
            title = `${table}_problem_asid`;
            data.data = await DB[tables].find();
            asid.data = await DB.Page.findOne({ title });
            break;
          case "Case":
          case "News":
            tables = `${table}_list`;
            arg = { title, tables };
            data.data = await DB[tables].findOne({ title });
            break;

          default:
            if (route_path.length > 1) {
              data = await DB[table_list].findOne({ title });
            } else {
              data = await DB[table].findOne({ title });
            }

            head = await DB.Head.findOne({ title });
            break;
        }
        routers.payload.args = arg;
        routers.payload.data = data ? data.data : null;
        routers.payload.head = head ? head.data : null;
        routers.payload.asid = asid ? asid.data : null;
        return routers;
      });
      ctx.status = 200;
      ctx.body = await Promise.all(Generate_router);
      break;

    // request Get_arg,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_arg请求
    case "Get_arg":
      var table = StrToUpperCase(ctx.query.table);
      var title = ctx.query.title;
      if (title) ctx.body = await DB[table].findOne({ title });
      else ctx.body = DB[table] ? await DB[table].find() : {};
      break;

    // request Get_Products_head,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_Products_Head请求
    case "Get_head":
      ctx.body = await DB.Head.findOne({ title: ctx.query.title });
      break;
  }
});

module.exports = router;
