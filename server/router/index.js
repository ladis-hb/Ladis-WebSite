const Router = require('koa-router')
const Mongo = require('../../plugins/MongoDB')
const json2html = require('html2json').json2html

const Server = ''
const DB = 'ladis'

const router = new Router()
const mongo_page = new Mongo(Server, DB, 'pages')
const mongo_Products = new Mongo(Server, DB, 'products')
const mongo_Router = new Mongo(Server, DB, 'router')
const mongo_Head = new Mongo(Server, DB, 'head')

router.get('/api/:id', async (ctx) => {
  const { id } = ctx.params
  console.log(id)
  switch (id) {
    case 'Head':
      let head = await mongo.findOne({ title: id })
      Head = json2html(head.data)
      ctx.body = Head
      break;

    case 'Products_list':
      let get_products_list = await mongo_page.findOne({ title: 'products_asid' })
      ctx.body = get_products_list.data
      break
    case 'Products_all':
      let Products_all = await mongo_Products.findOne({ title: 'All' })
      ctx.body = Products_all.data
      break
    case 'Get_support_asid':
      let support_asid = await mongo_page.findOne({ title: 'support_asid' })
      ctx.body = support_asid
      break
    case 'Get_support_down_list':
      //console.log(ctx.query.table)
      let mongo_support = new Mongo(Server, DB, 'support')
      let Get_support_down_list = await mongo_support.find({ parent: ctx.query.table })
      ctx.body = Get_support_down_list
      break
    //Generate 静态化时，路由表携带载荷
    case 'GET_router':
      let router = await mongo_Router.find()
      await Promise.all(
        router.map(async (val, i) => {
          router[i].data = []
          route = val.rout.split('/')
          route.shift()
          //取得路由=》页面名称
          let title = route.pop()
          //判断是否二级页面
          if (route.length < 2 && route != '') {
            //取得路由路径
            let table = route[0]
            let mongo = new Mongo(Server, DB, table)
            let arg = await mongo.findOne({ title: title })
            let head = await mongo_Head.findOne({ title: title })
            if (arg) router[i].data = arg.data
            else console.log(arg)
            //
            router[i].head = head.data

          } else if (route != '') {
            let table_list = route.join('_')
            let mongo = new Mongo(Server, DB, table_list)
            let arg = await mongo.findOne({ title: title })
            router[i].data = arg.data
          }
          return true
        })
      )

      ctx.body = router
      break

    // request Get_arg,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_arg请求
    case 'Get_arg':
      var table = ctx.query.table
      var title = ctx.query.title
      var mongo = new Mongo(Server, DB, table)
      if (title) ctx.body = await mongo.findOne({ title: title })
      else ctx.body = await mongo.find()
      //console.log(ctx.body)
      break

    // request Get_Products_head,当generate时，payload载荷正常加载，dev下payload失效
    //转而使用Get_Products_Head请求
    case 'Get_head':
      ctx.body = await mongo_Head.findOne({ title: ctx.query.title })
      break
  }
});

module.exports = router
