const fs = require('fs')
const cheerio = require('cheerio')
const Mongo = require('./MongoDB')
const Axios = require('axios')

const mongo_pages = new Mongo('', 'ladis', 'pages')
const mongo_router = new Mongo('', 'ladis', 'router')

const Router_Address = []
const Host = 'http://www.ladis.com.cn'
/**
 *
 *
 * @param {*} url 文件路径
 * @param {string} [type='products'] 格式化类型，Products|
 * @param {string} table 存储的集合
 * @param {*} query 选择器条件 '#scroller .list li'
 * @param {*} title 对象名称
 * @param {*} parent 对象负极名称
 * @param {*} arg 备用传参
 * @returns 返回序列化字面量对象
 */
async function Html_Serialize_Json(url, table, type = 'products', query, title, parent, arg) {
  console.log(Host + url)
  var file = await Axios.get(Host + url)
  var $ = cheerio.load(file.data)
  var result = {
    parent: parent,
    title: title, //文档标题
    date: new Date(),
    table: table,
    data: []
  }
  switch (type) {
    /* -----------------------------------head  table:pages ------------------------------------------------------ */
    case 'head':
      console.log(`抓取头部信息`)
      query = query || '#pc_nav .new-down'
      $(query).each(function (i, val) { //遍历一级li
        var j = $(this).prev()
        var title = j.text()
        var href = j.attr('href')
        href = href.split('/')[1]
        href = `/${href}/${title}`

        result.data[i] = {
          title,
          href,
          link: j.attr('href'),
          args: []
        }
        Router_Address.push(href)

        $(this).find('a').map(function (ii, v2) { //遍历二级li
          var h = $(this)
          var title = h.text()
          var href = h.attr('href')
          href = href.split('/')[1]
          href = `/${href}/${title}`

          result.data[i].args[ii] = {
            title,
            href,
            link: h.attr('href'),
          }
          //console.log(href)
          Router_Address.push(href)
        })
      })
      return result
      break
    /* -----------------------------------Products   ------------------------------------------------------ */
    case 'products':
      console.log(`抓取products信息`)
      query = query || '#scroller .list li'
      $(query).each(function (i, val) {
        var j = $(this)
        result.data[i] = {
          title: j.find('h3').text(),
          href: `/products/list/${j.find('h3').text()}`,//j.find('a').attr('href'),
          img: j.find('img').attr('src'),
          link: j.find('a').attr('href')
        }
        Router_Address.push(result.data[i].href)
      })
      return result
      break

    case 'products_asid':
      console.log(`抓取products_asid信息`)
      query = query || '#prodCateLeft ul'
      $(query).each(function (i, val) {
        var j = $(this).prev().find('a')
        var title = j.text()
        var href = j.attr('href')
        href = href.split('/')[1]
        href = `/${href}/${title}`

        result.data[i] = {
          title,
          href,
          link: j.attr('href'),
          args: []
        }
        Router_Address.push(href)

        $(this).find('a').map(function (ii, v2) {
          var h = $(this)
          var title = h.text()
          var href = h.attr('href')
          href = href.split('/')[1]
          href = `/${href}/${title}`
          result.data[i].args[ii] = {
            title,
            href,
            link: h.attr('href'),
          }

          Router_Address.push(href)
        })
      })
      return result
      break
    //每个设备的详情页面
    case 'products_dev_arg':
      console.log(`抓取products_dev_arg信息`)
      var data = { t1: {}, t2: {}, img: [], down: [], }
      //抓取说明链接
      data.t1 = { type: 'html', content: $('.printDisplay_para').html() }
      data.t2 = {
        type: 'html',
        content: $(".functionItems").html()
      }
      //console.log(t2)
      //抓取下载链接
      $('.functionItems a').has('span').map(function (val) {
        if (!$(this).attr('href').includes('.png') && !$(this).attr('href').includes('.jpg')) {
          var tmp = {
            target: $(this).attr('target'),
            href: $(this).attr('href'),
            title: $(this).text()
          }
          data.down.push(tmp)
        }
      })
      //抓取图片
      $('.swiper-wrapper').first().find('img').map(function (val) {
        data.img.push($(this).attr('src'))
      })
      var ImgArr = $('.functionItems .productUtilImg img')
      if (ImgArr) {

        ImgArr.map(function () {
          data.img.push($(this).attr('src'))
        })
      } else {
        data.img.push($('.swiper-slide img').first().attr('src'))
      }
      result.data = data
      return result
      break
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support
    //抓取support页面常见问题
    case 'support_problem':
      console.log(`support_problem`)
      query = query || '.relate a'
      var data = []
      $(query).each(function (i, val) {
        var title = ($(this).text()).split('、')[1].trim()
        var d = {
          title,
          link: $(this).attr('href'),
          href: `problem/${title}`
        }
        data.push(d)
      })
      //console.log(data)
      result.data = data
      return (result)
      break

    //抓取support页面软件下载
    case 'support_down':
      console.log(`support_down`)
      query = query || '.tabContBox li'
      var data = []
      $(query).each(function (i, val) {
        var j = $(this)
        var title = j.find('span').first().text()
        var href = j.find('a').attr('href')
        if (href.includes('.shtml')) {
          var down = Axios.get(Host + href).then(res => {
            var d = cheerio.load(res.data)
            return {
              type: 'soft',
              title: d('#Table .productName').text(),
              date: d('#Table .publishDate').text(),
              platform: d('#Table .platform').text(),
              language: d('#Table .language').text(),
              size: d('#Table .fileSize').text(),
              version: d('#Table .version').first().text(),
              updateReason: d('#Table .updateReason').text(),
              down: d('#Table .agreeLoad').attr('href'),
            }
          })
          data.push(down)
        } else {
          var down = { type: 'pdf', title, href }
          data.push(down)
        }
      })


      result.data = await Promise.all(data)
      return result
      break
    // support 常见问题，视频教程 asid
    case 'support_problem_asid':
      console.log(`support_problem_list`)
      query = query || '.left-search-list .search-list-item'
      var data = []
      $(query).each(function (i, val) {
        var title = $(this).find('.lmmc a').text()
        var link = $(this).find('.lmmc a').attr('href')
        var href = `/support/${title}`
        var d = {
          title, link, href, child: []
        }
        $(this).find('.list-sub-item a').map(function (i, val) {
          d.child[i] = {
            title: $(this).text(),
            link: $(this).attr('href'),
            href: `/support/${$(this).text()}`
          }
        })
        data.push(d)
      })
      result.data = data
      return (result)
      break

    // support 常见问题，视频教程 main
    case 'support_problem_args':
      console.log(`support_problem_list`)
      query = query || '.r-search-wrap li a'
      var data = []
      $(query).each(async function (i, val) {
        var j = $(this)
        var title = j.text()
        var link = j.attr('href')
        var href = `/support/problem/${title}`
        data[i] = { title, link, href, }

      })
      for (let i in data) {
        if (data[i].link.includes('.shtml')) {

          var movie = await Html_Serialize_Json(data[i].link, '', 'support_problem_args_mv', null, '', '')
          if (movie) data[i].movie = movie
          var html = await Html_Serialize_Json(data[i].link, '', 'support_problem_args_html', null, '', '')
          if (html) data[i].html = html
        }

      }
      result.data = data
      return result
      break
    //// support 常见问题，视频教程 main 视频
    case 'support_problem_args_mv':
      query = query || 'iframe'
      result = $(query).attr('src')
      return result
      break

    //// support 常见问题，视频教程 main 视频
    case 'support_problem_args_html':
      query = query || '.new_list_outer'
      result = $(query).html()
      return result
      break

    //获取销售服务中心页面
    case 'buy_list':
      query = query || ".new_list_outer"
      let map = $(query).find('map area')
      let list = $(query).find('.lxgd span')
      let Array_map = []
      let Array_list = []
      let pro = []
      if (arg == 'map') {
        map.each(function () {
          var { alt = '', shape, coords, href } = $(this).attr()
          Array_map.push({ alt, shape, coords, href })
        })
        result.data = Array_map
        return result
      }
      else {
        list.each(function () {
          let parentsUntil = $(this).find('strong').text()

          $(this).find('a').each(function (i) {
            let parent = $(this).text()
            let link = $(this).attr('href')
            //console.log('link')
            pro.push(Html_Serialize_Json(link, '', 'buy_list_li', null, '', '', { parentsUntil, link, parent }).then(res => {
              for (let i of res) {
                Array_list.push(i)
              }
              return true
            })
            )
          })
        })
        await Promise.all(pro)
        return Array_list
      }
      break

    //获取销售服务中心页面省份子页面
    case 'buy_list_li':
      let { parentsUntil, link, parent } = arg
      query = query || ".new_list_outer div"
      let a = []
      let ts = []
      $(query).each(function () {
        let title = $(this).find('strong').text()
        let content = $(this).text()
        if (!ts.includes(title)) {
          //console.log(title)
          ts.push(title)
          a.push({ parentsUntil, link, parent, title, content, table: 'buy_list' })
        }

      })
      return a
      break
    default:
      return false
      break
  }
  return true
}



async function start() {
/*   var Pages = []

  //添加头部文件
  Pages.push(Html_Serialize_Json(`/support/index.shtml`, 'pages', 'head', '#pc_nav .new-down', 'head'))
  //添加footer
  //Pages.push(Html_Serialize_Json(`/support/index.shtml`, 'pages', 'head', '.foot-nav-pc ul li', 'footer'))
  //添加products asid
  Pages.push(Html_Serialize_Json(`/products/index.shtml`, 'pages', 'products_asid', '#prodCateLeft ul', 'products_asid'))

  Pages.push(Html_Serialize_Json(`/support/node_27.shtml`, 'pages', 'support_problem', null, 'support_asid', 'support'))
  Pages.push(Html_Serialize_Json(`/support/node_25.shtml`, 'pages', 'support_problem_asid', null, 'support_problem_asid', 'support'))



  var Products = []
  //添加所有设备列表
  Products.push(await Html_Serialize_Json(`/products/index.shtml`, 'products', 'products', '#scroller .list li', 'All'))
  //添加UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_13.shtml`, 'products', 'products', '#scroller .list li', 'UPS电源'))
  //添加/products/node_81.shtml 后备式UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_81.shtml`, 'products', 'products', '#scroller .list li', '后备式UPS电源'))
  //添加高频单相UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_82.shtml`, 'products', 'products', '#scroller .list li', '高频单相UPS电源'))
  //添加 高频三相UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_83.shtml`, 'products', 'products', '#scroller .list li', '高频三相UPS电源'))
  //添加/工频UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_85.shtml`, 'products', 'products', '#scroller .list li', '工频UPS电源'))
  //添加/机架式UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_84.shtml`, 'products', 'products', '#scroller .list li', '机架式UPS电源'))
  //添加/模块化UPS电源
  Products.push(await Html_Serialize_Json(`/products/node_81.shtml`, 'products', 'products', '#scroller .list li', '模块化UPS电源'))
  //添加UPS蓄电池
  Products.push(await Html_Serialize_Json(`/products/node_81.shtml`, 'products', 'products', '#scroller .list li', 'UPS蓄电池'))

  //添加/数据中心
  Products.push(await Html_Serialize_Json(`/products/node_10.shtml`, 'products', 'products', '#scroller .list li', '数据中心'))
  //添加/微模块机房
  Products.push(await Html_Serialize_Json(`/products/node_143.shtml`, 'products', 'products', '#scroller .list li', '微模块机房'))
  //添加/一体化机柜
  Products.push(await Html_Serialize_Json(`/products/node_135.shtml`, 'products', 'products', '#scroller .list li', '一体化机柜'))
  //添加配电PDU
  Products.push(await Html_Serialize_Json(`/products/node_11.shtml`, 'products', 'products', '#scroller .list li', '配电PDU'))
  //添加/动环监控
  Products.push(await Html_Serialize_Json(`/products/node_136.shtml`, 'products', 'products', '#scroller .list li', '动环监控'))
  //添加/网络机柜
  Products.push(await Html_Serialize_Json(`/products/node_138.shtml`, 'products', 'products', '#scroller .list li', '网络机柜'))

  //机房空调
  Products.push(await Html_Serialize_Json(`/products/node_145.shtml`, 'products', 'products', '#scroller .list li', '机房空调'))
  //添房间空调
  Products.push(await Html_Serialize_Json(`/products/node_148.shtml`, 'products', 'products', '#scroller .list li', '房间空调'))
  //添加列间空调
  Products.push(await Html_Serialize_Json(`/products/node_147.shtml`, 'products', 'products', '#scroller .list li', '列间空调'))
  //添加/机架空调
  Products.push(await Html_Serialize_Json(`/products/node_146.shtml`, 'products', 'products', '#scroller .list li', '机架空调'))


  var Support = []
  Support.push(await Html_Serialize_Json(`/support/node_77.shtml`, 'support', 'support_down', null, 'windows', '监控软件下载'))
  Support.push(await Html_Serialize_Json(`/support/node_78.shtml`, 'support', 'support_down', null, 'linux', '监控软件下载'))
  Support.push(await Html_Serialize_Json(`/support/node_79.shtml`, 'support', 'support_down', null, 'mac', '监控软件下载'))
  Support.push(await Html_Serialize_Json(`/support/node_80.shtml`, 'support', 'support_down', null, 'other', '监控软件下载'))

  Support.push(await Html_Serialize_Json(`/support/node_89.shtml`, 'support', 'support_down', null, '其他产品彩页', '产品彩页说明'))
  Support.push(await Html_Serialize_Json(`/support/node_90.shtml`, 'support', 'support_down', null, '数据中心彩页', '产品彩页说明'))
  Support.push(await Html_Serialize_Json(`/support/node_91.shtml`, 'support', 'support_down', null, '机房空调彩页', '产品彩页说明'))
  Support.push(await Html_Serialize_Json(`/support/node_92.shtml`, 'support', 'support_down', null, 'UPS电源彩页', '产品彩页说明'))

  Support.push(await Html_Serialize_Json(`/support/node_96.shtml`, 'support', 'support_down', null, 'UPS相关', '证书资质'))
  Support.push(await Html_Serialize_Json(`/support/node_95.shtml`, 'support', 'support_down', null, '精密空调相关', '证书资质'))
  Support.push(await Html_Serialize_Json(`/support/node_94.shtml`, 'support', 'support_down', null, '数据中心相关', '证书资质'))
  Support.push(await Html_Serialize_Json(`/support/node_93.shtml`, 'support', 'support_down', null, '公司相关', '证书资质'))
 */
  var Buy = []
  Buy.push(await Html_Serialize_Json('/about/node_37.shtml', 'buy', 'buy_list', null, 'buy_map', 'buy', 'map'))




  await Promise.all(
    [/* Support, Products, Pages, */ Buy].map(async val => {
      await val
      for (v of val) {
        await v
        await Save_Serialize_Json(v)
      }
      return true
    })
  )


  await Get_support_problem_list_arg()
  //写入router记录
  console.log(Router_Address)
  Router_Address.map(val => {
    mongo_router.findOne({ rout: val }).then(async res => {
      if (!res) await mongo_router.insert({ rout: val })
    })
  })
}
//start()


/**
 * @param {*} row 数据
 */
async function Save_Serialize_Json(rows) {
  //解构 promise rows
  var { title, table, data } = await rows
  var db = new Mongo('', 'ladis', table)
  //
  if (await db.findOne({ title: title })) await db.updateOne({ title: title }, { $set: { data: data } })
  else await db.insert(await rows)
  console.log(`db.${table}.find({title:'${title}'}).toArray()`)

}


/**
 *遍历support下面常见问题列表，存入support_list表
 *
 */
async function Get_support_problem_list_arg() {
  var support_problem_list = await mongo_pages.findOne({ title: 'support_problem_list' })
  let args = []

  await Promise.all(
    support_problem_list.data.map(async val => {
      let a = await Html_Serialize_Json(val.link, 'support_list', "support_problem_args", null, val.title, val.title)
      for (let h of a.data) {
        let { table, date } = a
        h.table = table
        h.date = date
        h.parentsUntil = val.title
        h.parent = a.title
        args.push(h)
      }
      if (val.child.length > 1) {

        for (let arg of val.child) {
          //         if(arg.title == '数据中心相关') console.log([arg.title,arg])
          let i = await Html_Serialize_Json(arg.link, 'support_list', "support_problem_args", null, arg.title, arg.title)
          for (let h of i.data) {
            h.type = 'child'
            let { table, date } = i
            h.table = table
            h.date = date
            h.parentsUntil = val.title
            h.parent = arg.title
            args.push(h)
          }
        }
      }
      return true
    })
  )



  for (let arg of args) {
    var { title, table } = await arg
    var db = new Mongo('', 'ladis', table)
    //
    if (await db.findOne({ title: title })) {
      await db.updateOne({ title: title }, { $set: { parent: arg.parent } })
    }
    else await db.insert(arg)
    console.log(`db.${table}.find({title:'${title}'}).toArray()`)
  }
  console.log(`db.${table}.find({title:'${title}'}).toArray()`)
}

async function list() {
  var Buy_list = await Html_Serialize_Json('/about/node_37.shtml', 'buy_list', 'buy_list', null, 'buy_map', 'buy')
  for (li of Buy_list){
    await Save_Serialize_Json(li)
  }

}
//list()






