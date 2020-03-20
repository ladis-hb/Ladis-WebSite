/* jshint esversion:8 */
import cheerio from "cheerio";
import Axios, { AxiosResponse } from "axios";
const DB = require("../server/mongoose/content");

const Router_Address: string[] = [];
const Host: string = "http://www.ladis.com.cn";

interface result {
  parent: string
  title: string
  date: Date
  table: string
  data: any
}
interface resultData {
  title: string
  href: string
  link: string
  img?: string
  args?: resultData[]
}
interface products_t {
  type: string
  content: string
}
interface products_down {
  target: string
  href: string
  title: string
}
interface products {
  t1: products_t
  t2: products_t
  img: string[]
  down?: products_down[]
}
interface support_down {
  type: string;
  title: string;
  date?: string;
  platform?: string;
  language?: string;
  size?: string;
  version?: string;
  updateReason?: string;
  down?: string | undefined;
}
interface support_problem {
  title: string
  link: string,
  href: string
  movie?: string
  html?: string
  parentsUntil?: string
  parent?: string
  data?: any
  child?: support_problem[]
}

interface buy_map {
  alt: string; shape: string; coords: string; href: string;
}
interface buy_list { parentsUntil: string; link: string; parent: string; title: string; content: string; table: string; }
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
  url: string,
  table: string,
  type: string,
  query: string | null,
  title: string,
  parent: string,
  arg?: any
) {

  let result: result = {
    parent: parent,
    title: title, //文档标题
    date: new Date(),
    table: table,
    data: []
  };

  if (!url) console.log({
    url,
    table,
    type,
    query,
    title,
    parent,
    arg
  });
  const Url = Host + url



  const file = await Axios.get(Url);

  const $ = cheerio.load(file.data)


  switch (type) {
    /* -----------------------------------head  table:pages ------------------------------------------------------ */
    case "head":
      {
        console.log(`抓取头部信息`);
        $("#pc_nav .new-down").each(function (i, val) {
          //遍历一级li
          const prev = $(val).prev()
          const title = prev.text()
          let href = `/${prev.attr("href")?.split("/")[1]}/${title}`
          const link = prev.attr("href") as string
          const data: resultData = {
            title,
            href,
            link,
            args: []
          }
          Router_Address.push(href);

          prev.find("a")
            .map(function (ii, v2) {
              //遍历二级li
              const h = $(v2);
              const title = h.text();
              const href = `/${h.attr("href")?.split("/")[1]}/${title}`;
              const link = h.attr("href") as string
              data.args?.push({
                title,
                href,
                link
              })
              //console.log(href)
              Router_Address.push(href);
            });
          result.data.push(data)
        });
      }
      break

    /* -----------------------------------Products   ------------------------------------------------------ */
    case "products":
      {
        console.log(`抓取products信息`);
        $("#scroller .list li").each(function (i, val) {
          const j = $(val);
          result.data.push({
            title: j.find("h3").text(),
            href: `/products/list/${j.find("h3").text()}`, //j.find('a').attr('href'),
            img: j.find("img").attr("src") as string,
            link: j.find("a").attr("href") as string
          })
          Router_Address.push(result.data[i].href);
        });
      }
      break

    case "products_asid":
      {
        console.log(`抓取products_asid信息`);
        $("#prodCateLeft ul").each(function (i, val) {
          const j = $(val)
            .prev()
            .find("a");
          const title = j.text();
          const href = `/${j.attr("href")?.split("/")[1]}/${title}`
          result.data[i] = {
            title,
            href,
            link: j.attr("href") as string,
            args: []
          };
          Router_Address.push(href);

          j.find("a")
            .map(function (ii, v2) {
              const h = $(v2);
              const title = h.text();
              const href = `/${j.attr("href")?.split("/")[1]}/${title}`
              result.data[i]?.args?.push({
                title,
                href,
                link: h.attr("href") as string
              })

              Router_Address.push(href);
            });
        });
      }
      break
    //每个设备的详情页面
    case "products_dev_arg":
      {

        console.log(`抓取products_dev_arg信息`);
        const t1: products_t = { type: "html", content: $(".printDisplay_para").html() as string };
        const t2: products_t = {
          type: "html",
          content: $(".functionItems").html() as string
        };
        let datas: products = { t1, t2, img: [], down: [] };
        //抓取说明链接
        //console.log(t2)
        //抓取下载链接
        $(".functionItems a")
          .has("span")
          .map(function (i, val) {
            if (
              !$(val)?.attr("href")?.includes(".png") &&
              !$(val)?.attr("href")?.includes(".jpg")
            ) {
              datas.down?.push({
                target: $(val).attr("target") as string,
                href: $(val).attr("href") as string,
                title: $(val).text() as string
              })
            }
          });
        //抓取图片
        $(".swiper-wrapper")
          .first()
          .find("img")
          .map(function (i, val) {
            datas.img.push($(val).attr("src") as string);
          });
        const ImgArr = $(".functionItems .productUtilImg img");
        if (ImgArr) {
          ImgArr.map(function (i, val) {
            datas.img.push($(val).attr("src") as string);
          });
        } else {
          datas.img.push(
            $(".swiper-slide img")?.first()?.attr("src") as string
          );
        }
        result.data = datas
      }
      break
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support
    //抓取support页面常见问题
    case "support_problem":
      {
        console.log(`support_problem`);
        const data: { title: string; link: string | undefined; href: string; }[] = [];
        $(".relate a").each(function (i, val) {
          const title = $(val)
            .text()
            .split("、")[1]
            .trim();
          const d = {
            title,
            link: $(val).attr("href"),
            href: `problem/${title}`
          };
          data.push(d);
        });
        //console.log(data)
        result.data = data;
      }
      break

    //抓取support页面软件下载
    case "support_down":
      {

        console.log(`support_down`);
        const data: support_down[] = [];
        $(".tabContBox li").each(async function (i, val) {
          const j = $(val);
          const title = j
            .find("span")
            .first()
            .text();
          const href = j.find("a").attr("href") as string;
          if (href.includes(".shtml")) {
            const down = await Axios.get(Host + href)
            const d = cheerio.load(down.data)
            let info: support_down = {
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
            }
            data.push(info);
          } else {
            const down = { type: "pdf", title, href };
            data.push(down);
          }
        });

        result.data = await Promise.all(data);
      }
      break
    // support 常见问题，视频教程 asid
    case "support_problem_asid":
      {

        console.log(`support_problem_list`);
        const data: support_problem[] = [];
        $(".left-search-list .search-list-item").each(function (i, val) {
          const j = $(val)
          const title = j.find(".lmmc a")
            .text();
          const link = j.find(".lmmc a")
            .attr("href") as string
          const href = `/support/${title}`;
          const d: support_problem = {
            title,
            link,
            href,
            child: []
          };
          j.find(".list-sub-item a")
            .map(function (i, val) {
              d.child?.push({
                title: $(val).text(),
                link: $(val).attr("href") as string,
                href: `/support/${$(val).text()}`
              })

            });
          data.push(d);
        });
        result.data = data;
      }
      break;

    // support 常见问题，视频教程 main
    case "support_problem_args":
      {
        console.log(`support_problem_list`);
        const data: support_problem[] = [];
        $(".r-search-wrap li a").each(async function (i, val) {
          const j = $(val);
          const title = j.text();
          const link = j.attr("href") as string
          const href = `/support/problem/${title}`;
          data[i] = { title, link, href };
        });
        for (let i in data) {
          if (data[i].link.includes(".shtml")) {
            const movie = await Html_Serialize_Json(
              data[i].link,
              "",
              "support_problem_args_mv",
              null,
              "",
              ""
            );
            if (movie) data[i].movie = movie.data;
            const html = await Html_Serialize_Json(
              data[i].link,
              "",
              "support_problem_args_html",
              null,
              "",
              ""
            );
            if (html) data[i].html = html.data;
          }
        }
        result.data = data;
      }
      break
    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_mv":
      query = query || "iframe";
      result.data = $(query).attr("src");
      break

    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_html":
      query = query || ".new_list_outer";
      result.data = $(query).html();
      break

    //获取销售服务中心页面
    case "buy_list":
      {
        let map = $(".new_list_outer").find("map area");
        let list = $(".new_list_outer").find(".lxgd span");

        if (arg == "map") {
          const Array_map: buy_map[] = []
          map.each(function (i, val) {
            const { alt = "", shape, coords, href } = $(val).attr();
            Array_map.push({ alt, shape, coords, href });
          });
          result.data = Array_map;
        } else {
          let pro: Promise<result>[] = [];
          let Array_list: buy_list[] = [];
          list.each(function (i, val2) {
            let parentsUntil = $(val2)
              .find("strong")
              .text();


            {

              $(val2)
                .find("a")
                .each(function (i,val3) {
                  let parent = $(val3).text();
                  let link = $(val3).attr("href") as string;
                  //console.log('link')
                  const buy_list = Html_Serialize_Json(link, "", "buy_list_li", null, "", "", {
                    parentsUntil,
                    link,
                    parent
                  })
                  pro.push(buy_list)
                })
            }
          });
          const buy_list: result[] = await Promise.all(pro)
          buy_list.forEach(el => {
            const a: buy_list[] = el.data
            Array_list = [...Array_list, ...a]
          })
          result.data = Array_list;
        }
      }
      break;

    //获取销售服务中心页面省份子页面
    case "buy_list_li":
      {
        let { parentsUntil, link, parent } = arg;
        let data: buy_list[] = [];
        let tsCache: Set<string> = new Set();
        $(".new_list_outer div").each(function (i, val) {
          let title = $(val)
            .find("strong")
            .text();
          let content = $(val).text();
          if (!tsCache.has(title)) {
            //console.log(title)
            tsCache.add(title)
            data.push({
              parentsUntil,
              link,
              parent,
              title,
              content,
              table: "buy_list"
            });
          }
        });
        result.data = data
      }
      break
  }
  return result
}

async function start() {
  //添加头部文件
  const Pages: Promise<result>[] = [];
  [
    [`/support/index.shtml`, "head", "head"],
    [`/products/index.shtml`, "products_asid", "products_asid"],
    [`/support/node_27.shtml`, "support_problem", "support_asid"],
    [`/support/node_25.shtml`, "support_problem_asid", "support_problem_asid"]
  ].forEach(([path, type, title]) => {
    Pages.push(Html_Serialize_Json(path, "Page", type, null, title, "support"));
  });

  //添加所有设备列表
  const Products: Promise<result>[] = [];
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
        name,
        ""
      )
    );
  });

  //服务支持
  const Support: Promise<result>[] = [];
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
      .then((res: any) => {
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
  let support_problem_list: { data: support_problem[] } = await DB.Page.findOne({
    title: "support_problem_asid"
  });
  //获取
  let Support_list_linkArray: string[][] = [];
  support_problem_list.data.forEach(({ title, link, child }) => {
    if (link && link !== "") Support_list_linkArray.push([title, link]);
    if (child?.length === 0) return;
    child?.forEach(({ title: name, link: chLink }) => {
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
  let support_list_Array: support_problem[] = supportArray.map(el => {
    let { data, parent, table, title } = el;
    return data.map((el: { parent: string; parentsUntil: string; table: string; }) => {
      el.parent = title;
      el.parentsUntil = parent;
      el.table = table;
      return el;
    });
  });

  for (let el of support_list_Array) {

    await DB.Support_list.updateOne(
      { title: el.title },
      { $set: el },
      { upsert: true }
    ).then((res: any) => {
      console.log(res);
    });

  }
  console.log("Get_support_problem_list_arg Success ++++++++++++++");
}

async function Get_Product_list() {
  /* let Product = await DB.Product.find();
  let Product_link_Array = Product.map(({ title,parent, data }) => {
    return data.map(({ title, link }) => {
      return { parent, title, link };
    });
  });
  let Product_link: any[] = [];
  Product_link_Array.forEach((el: any) => {
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
    ).then((res: any) => {
      console.log(res);
    });
  } */
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
    return true
  });
}
