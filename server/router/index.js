/* jshint esversion:8 */
const Router = require("koa-router");
const Admin = require("./admin");
const Upload = require("./upload");

const router = new Router();
const { Collection } = require("../config");

router.get("/administrator/:id", Admin);
router.all("/uploads/:id", Upload);
router.get("/api/:id", async ctx => {
  const { id } = ctx.params;
  console.log(id);
  switch (id) {
    case "Get_index_news_list":
      let result1 = await ctx.db
        .collection(Collection.news_list)
        .find({})
        .limit(5)
        .toArray();
      ctx.body = result1;
      break;
    case "Head":
      let head = await ctx.db
        .collection(Collection.head)
        .findOne({ title: id }); //mongo.findOne({ title: id });
      Head = json2html(head.data);
      ctx.body = Head;
      break;

    case "Products_list":
      let get_products_list = await ctx.db
        .collection(Collection.pages)
        .findOne({ title: "products_asid" });
      // await mongo_page.findOne({       title: "products_asid"      });
      //console.log(get_products_list);
      ctx.body = get_products_list.data;
      break;
    case "Products_all":
      let Products_all = await ctx.db
        .collection(Collection.products)
        .findOne({ title: "All" }); // mongo_Products.findOne({ title: "All" });
      ctx.body = Products_all.data;
      break;

    case "Get_support_down_list":
      let Get_support_down_list = await ctx.db
        .collection(Collection.support)
        .find({ parent: ctx.query.table })
        .toArray(); //mongo_support.find({        parent: ctx.query.table      });
      ctx.body = Get_support_down_list;
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_news_list":
      {
        let result = await ctx.db
          .collection(Collection.news)
          .find()
          .sort({ date: -1 })
          .toArray();

        ctx.body = result;
      }
      break;
    //获取新闻列表，按时间new->old排序
    case "Get_case_list":
      {
        let result = await ctx.db
          .collection(Collection.case)
          .find()
          .sort({ date: -1 })
          .toArray();

        ctx.body = result;
      }
      break;
    //获取经销商列表子类
    case "Get_buy_li":
      {
        let city = ctx.query.city;
        let result = await ctx.db
          .collection(Collection.buy_list)
          .find({ "data.parent": city })
          //.sort({ date: -1 })
          .toArray();

        ctx.body = result;
      }
      break;
    //Generate 静态化时，路由表携带载荷
    case "GET_router":
      let i = 0;
      let rout_result = [];
      (await ctx.db
        .collection(Collection.router)
        .find()
        .toArray()).forEach(element => {
        if (!element.rout.includes("店")) rout_result.push(element);
      });

      let Generate_router = Object.values(rout_result).map(async ({ rout }) => {
        let routers = {
          route: rout,
          payload: { data: null, head: null, asid: null, args: null }
        };
        let route_path = rout.split("/"); //.shift(); //route.shift();
        route_path.shift();
        //console.log(route_path);

        //取得路由=》页面名称
        let title = route_path.pop();
        let table = route_path[0];
        let table_list = route_path.join("_");
        let data = { data: null },
          head = null,
          asid = { data: null },
          arg = {};

        switch (table) {
          case "support":
            tables = `${table}_list`;
            title = `${table}_problem_asid`;
            data.data =
              (await ctx.db
                .collection(tables)
                .find()
                .toArray()) || false;

            asid.data =
              (await ctx.db.collection(Collection.pages).findOne({ title })) ||
              false;
            break;
          case "case":
          case "news":
            tables = `${table}_list`;
            arg = { title, tables };
            data.data =
              (await ctx.db.collection(tables).findOne({ title })) || false;
            break;

          default:
            if (route_path.length > 1) {
              data =
                (await ctx.db.collection(table_list).findOne({ title })) ||
                false;
            } else {
              data =
                (await ctx.db.collection(table).findOne({ title })) || false;
            }

            head =
              (await ctx.db.collection(Collection.head).findOne({ title })) ||
              false;
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
      var table = ctx.query.table;
      var title = ctx.query.title;
      if (title) ctx.body = await ctx.db.collection(table).findOne({ title });
      else
        ctx.body = await ctx.db
          .collection(table)
          .find()
          .toArray();
      break;

    // request Get_Products_head,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_Products_Head请求
    case "Get_head":
      ctx.body = await ctx.db
        .collection(Collection.head)
        .findOne({ title: ctx.query.title });
      break;
  }
});

module.exports = router;
