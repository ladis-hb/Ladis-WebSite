/* jshint esversion:8 */
const cheerio = require("cheerio");
const Axios = require("axios");
const DB = require("../../server/mongoose/content");

const Router_Address = [];
const Host = "http://www.ladis.com.cn";
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
async function Html_Serialize_Json(
  url,
  table,
  type,
  query,
  title,
  parent,
  arg
) {
  var file = await Axios.get(Host + url);
  var $ = cheerio.load(file.data);
  var result = {
    parent: parent,
    title: title, //文档标题
    date: new Date(),
    table: table,
    data: []
  };
  switch (type) {
    /* -----------------------------------head  table:pages ------------------------------------------------------ */
    case "head":
      console.log(`抓取头部信息`);
      query = query || "#pc_nav .new-down";
      $(query).each(function(i, val) {
        //遍历一级li
        var j = $(this).prev();
        var title = j.text();
        var href = j.attr("href");
        href = href.split("/")[1];
        href = `/${href}/${title}`;

        result.data[i] = {
          title,
          href,
          link: j.attr("href"),
          args: []
        };
        Router_Address.push(href);

        $(this)
          .find("a")
          .map(function(ii, v2) {
            //遍历二级li
            var h = $(this);
            var title = h.text();
            var href = h.attr("href");
            href = href.split("/")[1];
            href = `/${href}/${title}`;

            result.data[i].args[ii] = {
              title,
              href,
              link: h.attr("href")
            };
            //console.log(href)
            Router_Address.push(href);
          });
      });
      return result;

    /* -----------------------------------Products   ------------------------------------------------------ */
    case "products":
      console.log(`抓取products信息`);
      query = query || "#scroller .list li";
      $(query).each(function(i, val) {
        var j = $(this);
        result.data[i] = {
          title: j.find("h3").text(),
          href: `/products/list/${j.find("h3").text()}`, //j.find('a').attr('href'),
          img: j.find("img").attr("src"),
          link: j.find("a").attr("href")
        };
        Router_Address.push(result.data[i].href);
      });
      return result;

    case "products_asid":
      console.log(`抓取products_asid信息`);
      query = query || "#prodCateLeft ul";
      $(query).each(function(i, val) {
        var j = $(this)
          .prev()
          .find("a");
        var title = j.text();
        var href = j.attr("href");
        href = href.split("/")[1];
        href = `/${href}/${title}`;

        result.data[i] = {
          title,
          href,
          link: j.attr("href"),
          args: []
        };
        Router_Address.push(href);

        $(this)
          .find("a")
          .map(function(ii, v2) {
            var h = $(this);
            var title = h.text();
            var href = h.attr("href");
            href = href.split("/")[1];
            href = `/${href}/${title}`;
            result.data[i].args[ii] = {
              title,
              href,
              link: h.attr("href")
            };

            Router_Address.push(href);
          });
      });
      return result;
    //每个设备的详情页面
    case "products_dev_arg":
      console.log(`抓取products_dev_arg信息`);
      var data = { t1: {}, t2: {}, img: [], down: [] };
      //抓取说明链接
      data.t1 = { type: "html", content: $(".printDisplay_para").html() };
      data.t2 = {
        type: "html",
        content: $(".functionItems").html()
      };
      //console.log(t2)
      //抓取下载链接
      $(".functionItems a")
        .has("span")
        .map(function(val) {
          if (
            !$(this)
              .attr("href")
              .includes(".png") &&
            !$(this)
              .attr("href")
              .includes(".jpg")
          ) {
            var tmp = {
              target: $(this).attr("target"),
              href: $(this).attr("href"),
              title: $(this).text()
            };
            data.down.push(tmp);
          }
        });
      //抓取图片
      $(".swiper-wrapper")
        .first()
        .find("img")
        .map(function(val) {
          data.img.push($(this).attr("src"));
        });
      var ImgArr = $(".functionItems .productUtilImg img");
      if (ImgArr) {
        ImgArr.map(function() {
          data.img.push($(this).attr("src"));
        });
      } else {
        data.img.push(
          $(".swiper-slide img")
            .first()
            .attr("src")
        );
      }
      result.data = data;
      return result;
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support
    //抓取support页面常见问题
    case "support_problem":
      console.log(`support_problem`);
      query = query || ".relate a";
      var data = [];
      $(query).each(function(i, val) {
        var title = $(this)
          .text()
          .split("、")[1]
          .trim();
        var d = {
          title,
          link: $(this).attr("href"),
          href: `problem/${title}`
        };
        data.push(d);
      });
      //console.log(data)
      result.data = data;
      return result;

    //抓取support页面软件下载
    case "support_down":
      console.log(`support_down`);
      query = query || ".tabContBox li";
      var data = [];
      $(query).each(function(i, val) {
        var j = $(this);
        var title = j
          .find("span")
          .first()
          .text();
        var href = j.find("a").attr("href");
        if (href.includes(".shtml")) {
          var down = Axios.get(Host + href).then(res => {
            var d = cheerio.load(res.data);
            let info = {
              type: "soft",
              title: d("#Table .productName")
                .text()
                .replace(/\n/g, ""),
              date: d("#Table .publishDate")
                .text()
                .replace(/\n/g, ""),
              platform: d("#Table .platform")
                .text()
                .replace(/\n/g, ""),
              language: d("#Table .language")
                .text()
                .replace(/\n/g, ""),
              size: d("#Table .fileSize")
                .text()
                .replace(/\n/g, ""),
              version: d("#Table .version")
                .first()
                .text()
                .replace(/\n/g, ""),
              updateReason: d("#Table .updateReason")
                .text()
                .replace(/\n/g, ""),
              down: d("#Table .agreeLoad").attr("href")
            };
            return info;
          });
          data.push(down);
        } else {
          var down = { type: "pdf", title, href };
          data.push(down);
        }
      });

      result.data = await Promise.all(data);
      return result;
    // support 常见问题，视频教程 asid
    case "support_problem_asid":
      {
        console.log(`support_problem_list`);
        query = query || ".left-search-list .search-list-item";
        var data = [];
        $(query).each(function(i, val) {
          var title = $(this)
            .find(".lmmc a")
            .text();
          var link = $(this)
            .find(".lmmc a")
            .attr("href");
          var href = `/support/${title}`;
          var d = {
            title,
            link,
            href,
            child: []
          };
          $(this)
            .find(".list-sub-item a")
            .map(function(i, val) {
              d.child[i] = {
                title: $(this).text(),
                link: $(this).attr("href"),
                href: `/support/${$(this).text()}`
              };
            });
          data.push(d);
        });
        result.data = data;
        return result;
      }
      break;

    // support 常见问题，视频教程 main
    case "support_problem_args":
      console.log(`support_problem_list`);
      query = query || ".r-search-wrap li a";
      var data = [];
      $(query).each(async function(i, val) {
        var j = $(this);
        var title = j.text();
        var link = j.attr("href");
        var href = `/support/problem/${title}`;
        data[i] = { title, link, href };
      });
      for (let i in data) {
        if (data[i].link.includes(".shtml")) {
          var movie = await Html_Serialize_Json(
            data[i].link,
            "",
            "support_problem_args_mv",
            null,
            "",
            ""
          );
          if (movie) data[i].movie = movie;
          var html = await Html_Serialize_Json(
            data[i].link,
            "",
            "support_problem_args_html",
            null,
            "",
            ""
          );
          if (html) data[i].html = html;
        }
      }
      result.data = data;
      return result;
    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_mv":
      query = query || "iframe";
      result = $(query).attr("src");
      return result;

    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_html":
      query = query || ".new_list_outer";
      result = $(query).html();
      return result;

    //获取销售服务中心页面
    case "buy_list":
      {
        query = query || ".new_list_outer";
        let map = $(query).find("map area");
        let list = $(query).find(".lxgd span");
        let Array_map = [];
        let Array_list = [];
        let pro = [];
        if (arg == "map") {
          map.each(function() {
            var { alt = "", shape, coords, href } = $(this).attr();
            Array_map.push({ alt, shape, coords, href });
          });
          result.data = Array_map;
          return result;
        } else {
          list.each(function() {
            let parentsUntil = $(this)
              .find("strong")
              .text();

            $(this)
              .find("a")
              .each(function() {
                let parent = $(this).text();
                let link = $(this).attr("href");
                //console.log('link')
                pro.push(
                  Html_Serialize_Json(link, "", "buy_list_li", null, "", "", {
                    parentsUntil,
                    link,
                    parent
                  }).then(res => {
                    for (let i of res) {
                      Array_list.push(i);
                    }
                    return true;
                  })
                );
              });
          });
          await Promise.all(pro);
          result.data = Array_list;
          return result;
        }
      }
      break;

    //获取销售服务中心页面省份子页面
    case "buy_list_li": {
      let { parentsUntil, link, parent } = arg;
      query = query || ".new_list_outer div";
      let a = [];
      let ts = [];
      $(query).each(function() {
        let title = $(this)
          .find("strong")
          .text();
        let content = $(this).text();
        if (!ts.includes(title)) {
          //console.log(title)
          ts.push(title);
          a.push({
            parentsUntil,
            link,
            parent,
            title,
            content,
            table: "buy_list"
          });
        }
      });
      return a;
    }
    default:
      return false;
  }
}

async function start() {
  //添加头部文件
  var Pages = [];
  [
    [`/support/index.shtml`, "head", "head"],
    [`/products/index.shtml`, "products_asid", "products_asid"],
    [`/support/node_27.shtml`, "support_problem", "support_asid"],
    [`/support/node_25.shtml`, "support_problem_asid", "support_problem_asid"]
  ].forEach(([path, type, title]) => {
    Pages.push(Html_Serialize_Json(path, "Page", type, null, title, "support"));
  });

  //添加所有设备列表
  const Products = [];
  [
    [`/products/index.shtml`, "All"],
    [`/products/node_13.shtml`, "UPS电源"],
    [`/products/node_81.shtml`, "后备式UPS电源"],
    [`/products/node_82.shtml`, "高频单相UPS电源"],
    [`/products/node_83.shtml`, "高频三相UPS电源"],
    [`/products/node_85.shtml`, "工频UPS电源"],
    [`/products/node_84.shtml`, "机架式UPS电源"],
    [`/products/node_81.shtml`, "模块化UPS电源"],
    [`/products/node_81.shtml`, "UPS蓄电池"],
    [`/products/node_10.shtml`, "数据中心"],
    [`/products/node_143.shtml`, "微模块机房"],
    [`/products/node_135.shtml`, "一体化机柜"],
    [`/products/node_11.shtml`, "配电PDU"],
    [`/products/node_136.shtml`, "动环监控"],
    [`/products/node_138.shtml`, "网络机柜"],
    [`/products/node_145.shtml`, "机房空调"],
    [`/products/node_148.shtml`, "房间空调"],
    [`/products/node_147.shtml`, "列间空调"],
    [`/products/node_146.shtml`, "机架空调"]
  ].forEach(([path, name]) => {
    Products.push(
      Html_Serialize_Json(
        path,
        "Product",
        "products",
        "#scroller .list li",
        name
      )
    );
  });

  //服务支持
  var Support = [];
  [
    [`/support/node_77.shtml`, "windows", "监控软件下载"],
    [`/support/node_78.shtml`, "linux", "监控软件下载"],
    [`/support/node_79.shtml`, "mac", "监控软件下载"],
    [`/support/node_80.shtml`, "other", "监控软件下载"],
    [`/support/node_89.shtml`, "其他产品彩页", "产品彩页说明"],
    [`/support/node_90.shtml`, "数据中心彩页", "产品彩页说明"],
    [`/support/node_91.shtml`, "机房空调彩页", "产品彩页说明"],
    [`/support/node_92.shtml`, "UPS电源彩页", "产品彩页说明"],
    [`/support/node_96.shtml`, "UPS相关", "证书资质"],
    [`/support/node_95.shtml`, "精密空调相关", "证书资质"],
    [`/support/node_94.shtml`, "数据中心相关", "证书资质"],
    [`/support/node_93.shtml`, "公司相关", "证书资质"]
  ].forEach(([path, title, parent]) => {
    Support.push(
      Html_Serialize_Json(path, "Support", "support_down", null, title, parent)
    );
  });

  //Buy
  let Buy = Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy",
    "buy_list",
    null,
    "buy_map",
    "buy",
    "map"
  );
  //buy_list
  let Buy_list = Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy_list",
    "buy_list",
    null,
    "buy_map",
    "map",
    "child"
  );

  /* Promise.all([Destruction(Buy), Destruction(Buy_list)]) */
  let Rows = await Promise.all([
    ...Pages,
    ...Products,
    ...Support,
    Buy,
    Buy_list
  ]);

  console.log(`操作数据长度${Rows.length}`);
  for (let element of Rows) {
    let { parent, title, date, table, data } = element;
    if (!table) return console.log(element);
    await DB[table]
      .updateOne(
        { title },
        { $set: { parent, date, table, data } },
        { upsert: true }
      )
      .then(res => {
        console.log(res);
      });
  }

  return true;
}
start().then(async res => {
  await Get_support_problem_list_arg();
  await Get_Product_list();
  await WriteRouter();
});
//技术服务写入
//Get_support_problem_list_arg();
Get_Product_list();
//WriteRouter();

/**
 *遍历support下面常见问题列表，存入support_list表
 *
 */
async function Get_support_problem_list_arg() {
  let support_problem_list = await DB.Page.findOne({
    title: "support_problem_asid"
  });
  //获取
  let Support_list_linkArray = [];
  support_problem_list.data.forEach(({ title, link, child }) => {
    if (link && link !== "") Support_list_linkArray.push([title, link]);
    if (child.length === 0) return;
    child.forEach(({ title: name, link: chLink }) => {
      Support_list_linkArray.push([name, chLink, title]);
    });
  });
  let Support_list = Support_list_linkArray.map(([name, chLink, title]) => {
    return Html_Serialize_Json(
      chLink,
      "support_list",
      "support_problem_args",
      null,
      name,
      title
    );
  });

  let supportArray = await Promise.all([...Support_list]);
  let support_list_Array = supportArray.map(el => {
    let { data, parent, table, title } = el;
    return data.map(el => {
      el.parent = title;
      el.parentsUntil = parent;
      el.table = table;
      return el;
    });
  });

  for (let el of support_list_Array) {
    for (let e of el) {
      await DB.Support_list.updateOne(
        { title: e.title },
        { $set: e },
        { upsert: true }
      ).then(res => {
        console.log(res);
      });
    }
  }
  console.log("Get_support_problem_list_arg Success ++++++++++++++");
}

async function Get_Product_list() {
  let Product = await DB.Product.find();
  let Product_link_Array = Product.map(({ title: parent, data }) => {
    return data.map(({ title, link }) => {
      return { parent, title, link };
    });
  });
  let Product_link = [];
  Product_link_Array.forEach(el => {
    Product_link = [...Product_link, ...el];
  });

  let Product_list_Promise = Product_link.map(({ parent, title, link }) => {
    return Html_Serialize_Json(
      link,
      "Product_list",
      "products_dev_arg",
      null,
      title,
      parent
    );
  });

  let Product_list = await Promise.all([...Product_list_Promise]);
  for (let e of Product_list) {
    await DB.Product_list.updateOne(
      { title: e.title },
      { $set: e },
      { upsert: true }
    ).then(res => {
      console.log(res);
    });
  }
  console.log("Get_Product_list Success ++++++++++++++");
}

async function WriteRouter() {
  //写入router记录
  console.log(`写入router记录`);
  let out = [
    "//天猫旗舰店",
    "//京东旗舰店",
    "//蓝光数码专营店",
    "/case/成功案例",
    "/case/UPS电源",
    "/case/数据中心",
    "/case/机房空调",
    "/case/更多案例",
    "/news/新闻资讯",
    "/about/销售服务中心",
    "/join/加入我们",
    "/about/公司简介",
    "/about/关于我们",
    "/about/经营理念",
    "/about/服务承诺",
    "/about/联系我们",
    "/about/经销商列表"
  ];

  Router_Address.forEach(rout => {
    if (out.includes(rout)) return false;
    DB.SaveRouter({ rout });
  });
}
