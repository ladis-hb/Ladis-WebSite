/* jshint esversion:8 */
import cheerio from "cheerio";
import Axios from "axios";
import DB from "../server/mongoose/content";
import {
  supportList,
  GMlink,
  pageLink,
  GMpack,
  product,
  productContentOld,
  productList,
  supportAsid,
  support,
  supportProblem,
  buy,
  buyList,
  DbTables,
} from "./typing";

const Host: string = "http://www.ladis.com.cn";

async function Html_Serialize_Json(
  url: string,
  table: DbTables,
  type: string,
  query: string | null,
  title: string,
  parent: string,
  arg?: any,
) {
  const defaults: GMpack = {
    MainTitle: title,
    date: new Date(),
    MainParent: parent || "",
    table,
    href: "",
    link: "",
  };

  if (!url) console.log(defaults);

  const file = await Axios.get(Host + url)
    .then(res => res.data)
    .catch(e => {
      
      console.log({ url, table, type, query, title, parent, arg,error:"axios error" });
      return false
    });
    if(!file) throw new Error("get file error")
  const $ = cheerio.load(file);

  switch (type) {
    /* -----------------------------------head  table:pages ------------------------------------------------------ */
    case "head": {
      console.log(`抓取头部信息`);
      // 结果
      const result: pageLink[] = [];
      $("#pc_nav .new-down").each(function(i: any, val: any) {
        //遍历一级li
        const prev = $(val).prev();
        const title = prev.text();
        let href = `/${prev.attr("href")?.split("/")[1]}/${title}`;
        const link = prev.attr("href") as string;
        // 保存结果
        const args: pageLink[] = [];
        prev.find("a").map(function(ii: any, v2: any) {
          //遍历二级li
          const h = $(v2);
          const title = h.text();
          const href = `/${h.attr("href")?.split("/")[1]}/${title}`;
          const link = h.attr("href") as string;
          args.push({
            ...defaults,
            title,
            href,
            link,
          });
        });
        const data: pageLink = {
          ...defaults,
          title,
          href,
          link,
          args,
        };
        result.push(data);
      });
      return result;
    }
    /* -----------------------------------Products   ------------------------------------------------------ */
    case "products": {
      const result: product[] = [];
      console.log(`抓取products信息`);
      $("#scroller .list li").each(function(i: any, val: any) {
        const j = $(val);
        const data: product = {
          ...defaults,
          title: j.find("h3").text(),
          href: `/products/list/${j.find("h3").text()}`, //j.find('a').attr('href'),
          img: j.find("img").attr("src") as string,
          link: j.find("a").attr("href") as string,
        };
        result.push(data);
      });
      return result;
    }

    /* case "products_asid":
      {
        console.log(`抓取products_asid信息`);
        $("#prodCateLeft ul").each(function (i, val) {
          const j = $(val)
            .prev()
            .find("a");
          const title = j.text();
          const href = `/${j.attr("href")?.split("/")[1]}/${title}`
          // save
          const data
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
      break */
    //每个设备的详情页面
    case "products_dev_arg":
      {
        const result: productList[] = [];
        console.log(`抓取products_dev_arg信息`);
        const t1: productContentOld = {
          type: "html",
          content: $(".printDisplay_para").html() as string,
        };
        const t2: productContentOld = {
          type: "html",
          content: $(".functionItems").html() as string,
        };
        const img: string[] = [];
        const down: GMlink[] = [];
        //抓取说明链接
        //console.log(t2)
        //抓取下载链接
        $(".functionItems a")
          .has("span")
          .map(function(i: any, val: any) {
            if (
              !$(val)
                ?.attr("href")
                ?.includes(".png") &&
              !$(val)
                ?.attr("href")
                ?.includes(".jpg")
            ) {
              down.push({
                target: $(val).attr("target") as string,
                href: $(val).attr("href") as string,
                title: $(val).text() as string,
              });
            }
          });
        //抓取图片
        $(".swiper-wrapper")
          .first()
          .find("img")
          .map(function(i: any, val: any) {
            img.push($(val).attr("src") as string);
          });
        const ImgArr = $(".functionItems .productUtilImg img");
        if (ImgArr) {
          ImgArr.map(function(i: any, val: any) {
            img.push($(val).attr("src") as string);
          });
        } else {
          img.push(
            $(".swiper-slide img")
              ?.first()
              ?.attr("src") as string,
          );
        }
        const data: productList = { ...defaults,title:defaults.MainTitle, t1, t2, img, down, link: url };
        result.push(data);
        return result;
      }
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support
    //抓取support页面常见问题
    case "support_problem": {
      console.log(`support_problem`);
      const data: supportAsid[] = [];
      $(".relate a").each(function(i: any, val: any) {
        const title = $(val)
          .text()
          .split("、")[1]
          .trim();
        data.push({
          ...defaults,
          title,
          link: $(val).attr("href") as string,
          href: `problem/${title}`,
        });
      });
      //console.log(data)
      return data;
    }

    //抓取support页面软件下载
    case "support_down": {
      console.log(`support_down`);
      const data: support[] = [];
      $(".tabContBox li").each(async function(i: any, val: any) {
        const j = $(val);
        const title = j
          .find("span")
          .first()
          .text();
        const href = j.find("a").attr("href") as string;
        if (href.includes(".shtml")) {
          const down = await Axios.get(Host + href);
          const d = cheerio.load(down.data);
          let info: support = {
            ...defaults,
            link: href,
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
            down: d("#Table .agreeLoad").attr("href") as string,
          };
          data.push(info);
        } else {
          let down: support = { ...defaults, type: "pdf", title, href };
          data.push(down);
        }
      });
      return data;
    }
    // support 常见问题，视频教程 asid
    case "support_problem_asid": {
      console.log(`support_problem_list`);
      const data: supportProblem[] = [];
      $(".left-search-list .search-list-item").each(function(i: any, val: any) {
        const j = $(val);
        const title = j.find(".lmmc a").text();
        const link = j.find(".lmmc a").attr("href") as string;
        const href = `/support/${title}`;
        const child: supportProblem[] = [];
        const d: supportProblem = {
          ...defaults,
          title,
          link,
          href,
        };
        j.find(".list-sub-item a").map(function(i: any, val: any) {
          child.push({
            ...defaults,
            MainParent: d.MainTitle,
            MainTitle: d.title,
            title: $(val).text(),
            link: $(val).attr("href") as string,
            href: `/support/${$(val).text()}`,
          });
        });
        d.child = child;
        data.push(d);
      });
      return data;
    }
    // support 常见问题，视频教程 main
    case "support_problem_args": {
      const result: supportList[] = [];
      console.log(`support_problem_list`);

      $(".r-search-wrap li a").each(async function(i: any, val: any) {
        const j = $(val);
        const title = j.text();
        const link = j.attr("href") as string;
        const href = `/support/problem/${title}`;
        const data: supportList = { ...defaults, title, link, href };
        if (data.link.includes(".shtml")) {
          const movie = await Html_Serialize_Json(
            data.link,
            "Support_list",
            "support_problem_args_mv",
            null,
            title,
            parent,
          );
          if (movie) data.movie = <string>movie;
          const html = await Html_Serialize_Json(
            data.link,
            "Support_list",
            "support_problem_args_html",
            null,
            title,
            parent,
          );
          if (html) data.html = <string>html;
        }
        result.push(data);
      });
      return result;
    }
    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_mv": {
      query = query || "iframe";
      return $(query).attr("src");
    }

    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_html": {
      query = query || ".new_list_outer";
      return $(query).html();
    }
    //获取销售服务中心页面
    case "buy_list":
      {
        const result: buy[] = [];

        let map = $(".new_list_outer").find("map area");
        let list = $(".new_list_outer").find(".lxgd span");
        // map地图数据
        if (arg == "map") {
          map.each(function(i: any, val: any) {
            const { alt = "", shape, coords, href } = $(val).attr();
            result.push({ ...defaults, alt, shape, coords, href });
          });
          return result;
        } else {
          //列表
          let pro: Promise<buyList[]>[] = [];
          list.each(function(i: any, val2: any) {
            // 大区 华东销售中心
            const parentsUntil = $(val2)
              .find("strong")
              .text();

            $(val2)
              .find("a")
              .each(function(i: any, val3: any) {
                // 省
                const parent = $(val3).text();
                // 链接
                let link = $(val3).attr("href") as string;
                //console.log('link')
                // 获取每个链接的详情
                const buy_list = <Promise<buyList[]>>(
                  Html_Serialize_Json(link, "Buy_list", "buy_list_li", null, "", "", {
                    parentsUntil,
                    link,
                    parent,
                  })
                );
                pro.push(buy_list);
              });
          });

          const buy_list: buyList[][] = await Promise.all(pro);
          let data: buyList[] = [];
          buy_list.forEach(list => {
            data = [...data, ...list];
          });
          return data;
          //result = buy_list;
        }
      }
      break;

    //获取销售服务中心页面省份子页面
    case "buy_list_li": {
      const { parentsUntil, link, parent } = arg;
      const data: buyList[] = [];
      let tsCache: Set<string> = new Set();
      $(".new_list_outer div").each(function(i: any, val: any) {
        const title = $(val)
          .find("strong")
          .text();
        const content = $(val).text();
        if (!tsCache.has(title)) {
          //console.log(title)
          tsCache.add(title);
          data.push({
            ...defaults,
            MainTitle: parent,
            MainParent: parent,
            parentsUntil,
            link,
            parent,
            title,
            content,
          });
        }
      });
      return data;
    }
  }
  setTimeout(() => {
    console.log({ url, table, type, query, title, parent, arg ,error:"timeOut"});
    return false;
  }, 1000 * 60);
}

async function start() {
  //添加头部文件
  const Pages: Promise<any>[] = [];
  [
    [`/support/index.shtml`, "head", "head"],
    //[`/products/index.shtml`, "products_asid", "products_asid"],
    [`/support/node_27.shtml`, "support_problem", "support_asid"],
    [`/support/node_25.shtml`, "support_problem_asid", "support_problem_asid"],
  ].forEach(([path, type, title]) => {
    Pages.push(Html_Serialize_Json(path, "Page", type, null, title, "support"));
  });

  //添加所有设备列表
  const Products: Promise<any>[] = [];
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
    [`/products/node_146.shtml`, "机架空调"],
  ].forEach(([path, name]) => {
    Products.push(
      Html_Serialize_Json(path, "Product", "products", "#scroller .list li", name, "Product"),
    );
  });

  //服务支持
  const Support: Promise<support[]>[] = [];
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
    [`/support/node_93.shtml`, "公司相关", "证书资质"],
  ].forEach(([path, title, parent]) => {
    Support.push(
      <Promise<support[]>>Html_Serialize_Json(path, "Support", "support_down", null, title, parent),
    );
  });

  //Buy
  let Buy = await Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy",
    "buy_list",
    null,
    "buy_map",
    "buy",
    "map",
  );
  //buy_list
  let Buy_list = await Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy_list",
    "buy_list",
    null,
    "buy_map",
    "map",
    "child",
  );
  const Rows = [...Pages, ...Products, ...Support, Buy, Buy_list];
  console.log(`操作数据长度${Rows.length}`);
  for (let row of Rows) {
    console.log(row);
    const result: GMpack[] = await row;
    if (!result) continue;
    console.log(result);
    for (let sigle of result) {
      console.log(sigle);
      await new (DB as any)[sigle.table](sigle).save();
      await WriteRouter(sigle.href)
    }
  }
}
start().then(async () => {
  await Get_Product_list();
  await Get_support_problem_list_arg();
  
});
//技术服务写入

/**
 *遍历support下面常见问题列表，存入support_list表
 *
 */
async function Get_support_problem_list_arg() {
  const support_problem_list: supportProblem[] = await DB.Page.find({
    MainTitle: "support_problem_asid",
  }).lean();
  //获取
  const Support_list_linkArray: string[][] = [];
  const titleSet:Set<string> = new Set()
  support_problem_list.forEach(({ title, link, child ,MainTitle}) => {
    if (link && link !== "") Support_list_linkArray.push([title, link,MainTitle]);
    if (child?.length === 0) return;
    child?.forEach(({ title: name, link: chLink }) => {
      if(titleSet.has(title)) return
      titleSet.add(title)
      Support_list_linkArray.push([name, chLink as string, title]);
    });
  });
  console.log(Support_list_linkArray);
  for(let [name, chLink, title] of Support_list_linkArray){
    const result = <supportList[]>await Html_Serialize_Json(chLink, "Support_list", "support_problem_args", null, name, title);
    for (let el of result) {
      await new DB.Support_list(el).save();
      await WriteRouter(el.href)
    }
  }
  /* const Support_list = Support_list_linkArray.map(([name, chLink, title]) => {
    return Html_Serialize_Json(chLink, "Support_list", "support_problem_args", null, name, title);
  });
  // [[list],[list]]
  const supportArray = <supportList[][]>await Promise.all([...Support_list]);
  

  for  (let list of supportArray) {
    for (let el of list) {
      await new DB.Support_list(el).save();
    }
  }*/
  console.log("Get_support_problem_list_arg Success ++++++++++++++");
}

async function Get_Product_list() {
  const Product: product[] = await DB.Product.find().lean();
  /* let Product_link_Array = Product.map(el=>({}));
  let Product_link: any[] = [];
  Product_link_Array.forEach((el: any) => {
    Product_link = [...Product_link, ...el];
  });
 */
  const titleSet:Set<string> = new Set()
  for (let el of Product){
    const result = <productList[]>await Html_Serialize_Json(
      el.link,
      "Product_list",
      "products_dev_arg",
      null,
      el.title,
      el.MainTitle,
    )
    for (let els of result) {
      if(titleSet.has(els.title)) return
      titleSet.add(els.title)
      await new DB.Product_list(els).save();
      await WriteRouter(els.href)
    }

  }
  console.log("Get_Product_list Success ++++++++++++++");
}

async function WriteRouter(rout: string) {
  if(!rout) return
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
    "/about/经销商列表",
  ];
  if (!out.includes(rout)) DB.SaveRouter({ rout });
}
