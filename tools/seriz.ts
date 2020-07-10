/* 
top:1,截取html字符串需要替换div,font等字符为span,富文本编辑器不识别
    2,html字段中所有的中文需要由字符实体转换为中文字符串

*/
import { load } from "cheerio";
import Axios from "axios";
import DB from "../server/mongoose/content";
const decoder = require('html-entity-decoder');
import {
  supportList,
  pageLink,
  GMpack,
  product,
  productList,
  supportAsid,
  support,
  supportProblem,
  buy,
  buyList,
  DbTables,
  cases,
  caseList,
  vr,
} from "./typing";

const Host: string = "http://www.ladis.com.cn";
const CaseNum = 14
const NewsNum = 1169

const errorArray: any[] = []

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
    PageTitle: '',
    Pagekeywords: '',
    Pagedescription: '',
    MainUrl: url,
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
      errorArray.push({ url, table, type, query, title, parent, arg, error: "axios error" })
      return false
    });
  if (!file) return false

  const $ = load(file);
  // 通用获取页面标题，key，des
  {
    const keys = ['keywords', 'description']
    defaults.PageTitle = $("title").text().split("-")[0].trim()
    console.log({ PageTitle: defaults.PageTitle });

    const meta = $("meta").map((i, val) => {
      return val.attribs
    })
      .get()
      .filter(el => keys.includes((el.name as string)))
      .map(el => ({ [el.name]: el.content }))

    const vals = Object.assign({}, ...meta)
    defaults.Pagekeywords = vals['keywords']
    defaults.Pagedescription = vals['description']
  }
  // console.log(defaults);


  switch (type) {
    /* -----------------------------------head  table:pages ------------------------------------------------------ */
    case "head": {
      // 结果
      const result: pageLink[] = [];
      $("#pc_nav .new-down").each(function (i, val) {
        //遍历一级li
        const prev = $(val).prev();
        const title = prev.text();
        let href = `/${prev.attr("href")?.split("/")[1]}/${title}`;
        const link = prev.attr("href") as string;
        // 保存结果
        const args: pageLink[] = [];
        prev.find("a").map(function (ii: any, v2: any) {
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
      $("#scroller .list li").each(function (i, val) {
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
    //每个设备的详情页面
    case "products_dev_arg":
      {
        const result: productList[] = [];
        //抓取图片
        const img: string[] = [];
        $(".swiper-wrapper")
          .first()
          .find("img")
          .map(function (i, val) {
            img.push($(val).attr("src") as string);
          });
        const ImgArr = $(".functionItems .productUtilImg img");
        if (ImgArr) {
          ImgArr.map(function (i, val) {
            img.push($(val).attr("src") as string);
          });
        } else {
          img.push(
            $(".swiper-slide img")
              ?.first()
              ?.attr("src") as string,
          );
        }

        const data: productList = {
          ...defaults, title: defaults.MainTitle as string, link: url,
          img: Array.from(new Set(img)), // 图片去重
          head: htmlParse($(".printDisplay_para").html()), //decoder.feed($(".printDisplay_para").html()?.replace(/\/n/g, "").replace(/(div|font)/g, "span").trim()),
          body: htmlParse($(".responseWidth").html()),//decoder.feed($(".responseWidth").html()?.replace(/\/n/g, "").replace(/(div|font)/g, "span").trim())
        };

        /* const t1: productContentOld = {
          type: "html",
          content: $(".printDisplay_para").html() as string,
        };
        const t2: productContentOld = {
          type: "html",
          content: $(".functionItems").html() as string,
        };
        
        const down: GMlink[] = []; 
        //抓取说明链接
        //console.log(t2)
        //抓取下载链接
        $(".functionItems a")
          .has("span")
          .map(function (i, val) {
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
          });*/

        result.push(data);
        return result;
      }
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support
    //抓取support页面常见问题
    case "support_problem": {
      const data: supportAsid[] = [];
      $(".relate a").each(function (i, val) {
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
      return data;
    }

    //抓取support页面软件下载
    case "support_down": {
      const data: support[] = [];
      $(".tabContBox li").each(async function (i, val) {
        const j = $(val);
        const title = j
          .find("span")
          .first()
          .text();
        const href = j.find("a").attr("href") as string;
        if (href.includes(".shtml")) {
          const down = await Axios.get(Host + href);
          const d = load(down.data);
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
      const data: supportProblem[] = [];
      $(".left-search-list .search-list-item").each(function (i, val) {
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
        j.find(".list-sub-item a").map(function (i, val) {
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
      const supportListResult: supportList[] = [];
      $(".r-search-wrap li a").each(function (i, val) {
        const j = $(val);
        const data: supportList = {
          ...defaults,
          title: j.text(),
          link: j.attr("href") as string,
          href: `/support/problem/${title}`
        };
        supportListResult.push(data);
      });
      for (let list of supportListResult) {
        if (list.link.includes(".shtml")) {
          list.movie = <string>await Html_Serialize_Json(
            list.link,
            "Support_list",
            "support_problem_args_mv",
            null,
            title,
            parent,
          );
          if (!list.movie) {
            // 没有
            list.html = <string>await Html_Serialize_Json(
              list.link,
              "Support_list",
              "support_problem_args_html",
              null,
              title,
              parent,
            );
          }

        }
      }
      return supportListResult;
    }
    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_mv": {
      return $("iframe").attr("src");
    }

    //// support 常见问题，视频教程 main 视频
    case "support_problem_args_html": {
      return htmlParse($(".new_list_outer").html())//decoder.feed($(".new_list_outer").html()?.replace(/\/n/g, "").replace(/(div|font)/g, "span").trim())
    }
    //获取销售服务中心页面
    case "buy_list":
      {
        let result: buy[] | buyList[] = [];
        // 地图数据
        const map = $(".new_list_outer").find("map area");
        // 经销商列表
        const list = $(".clearfix").find(".new_list_outer").find(".lxgd span");
        // 存放查询省经销商信息
        const pro: Promise<buyList[]>[] = [];
        // map地图数据
        if (arg == "map") {
          map.each(function (i, val) {
            const { alt = "", shape, coords, href } = $(val).attr();
            (<buy[]>result).push({ ...defaults, alt, shape, coords, href });
          });
        } else {
          //列表
          // console.log(list.length);

          list.each(function (i, val2) {
            // 大区 华东销售中心
            const parentsUntil = $(val2)
              .find("strong")
              .text();
            const area_list = $(val2).find("a")

            area_list.each(function (i, val3) {
              // 省
              const parents = $(val3).text();
              // 链接
              let link = $(val3).attr("href") as string;
              //console.log('link')
              // 获取每个链接的详情
              const buy_list = <Promise<buyList[]>>(
                Html_Serialize_Json(link, "Buy_list", "buy_list_li", null, parentsUntil, parent, {
                  parentsUntil,
                  link,
                  parent: parents,
                })
              );
              pro.push(buy_list);
            });
          });
          const buy_list: buyList[][] = await Promise.all(pro);
          buy_list.forEach(list => {
            result = <buyList[]>[...result as buyList[], ...list]
          });


        }
        return result;
      }
    /* ------------------------------ buy ------------------------ */

    //获取销售服务中心页面省份子页面
    case "buy_list_li": {
      const { parentsUntil, link, parent } = arg;
      const data: buyList[] = [];
      const tsCache: Set<string> = new Set();

      const area = $(".clearfix").find(".new_list_outer div") //$(".new_list_outer div").first()
      // console.log({MainParent:defaults.MainParent, parent,length:area.length});

      area.each(function (i, val) {
        const title = $(val)
          .find("strong")
          .text();
        const content = $(val).text();
        if (!tsCache.has(title)) {
          //console.log(title)
          tsCache.add(title);
          data.push({
            ...defaults,
            parentsUntil,
            link,
            parent,
            title,
            content,
          });
        }
      });
      // console.log({buy_list:data});

      return data;
    }

    /* -----------------------------vr ,case,news---------------------------------- */
    //360
    case "case":
    case "vr":
    case "news":
      //console.log("start serize 360");
      {

        const list = $("#listPc").find(".new_list");
        const map: cases[] = [];
        list.each(function (i, val) {
          const img = $(val)
            .find(".new_list_img img")
            .attr("src") as string

          const name = $(val)
            .find(".new_list_con .typeAndTime .type_name")
            .text();
          const time = $(val)
            .find(".new_list_con .typeAndTime .type_time")
            .text();
          const text = $(val)
            .find(".new_list_con .new_title_list")
            .text();
          const link = $(val)
            .find(".new_list_con .new_details a")
            .attr("href") as string
          const linkText = $(val)
            .find(".new_list_con .new_details a")
            .text();
          const href = `/${table}/${text}`;
          map.push({
            ...defaults,
            title: text,
            img,
            name,
            time,
            text,
            link,
            href,
            linkText
          });
        });
        return map
      }
    //case list
    case "case_list":
    case "news_list":
      {
        const data: caseList = {
          ...defaults,
          title,
          content: htmlParse($(".new_list_outer").html())//decoder.feed($(".new_list_outer").html()?.replace(/\/n/g, "").replace(/(div|font)/g, "span").trim() as string)
        }
        return data

        /* const dock: caseList = { ...defaults, title, text: [], pic: [] };
        const list = $(".MsoNormal");
        list.each(function (i, val) {
          const text = $(val)
            .find("font")
            .text();
          const pic = $(val)
            .find("img")
            .attr("src")
          if (text && text.trim() != "") (dock.text as string[]).push(text);
          if (pic) (dock.pic as string[]).push(pic);
        });
        //list2
        const list2 = $(".new_list_outer p");
        list2.each(function (i, val) {
          const text = $(val).text();
          const pic = $(val)
            .find("img")
            .attr("src");
          if (text && text.trim() != "") (dock.text as string[]).push(text);
          if (pic) (dock.pic as string[]).push(pic);
        });
        return dock; */
      }

    /* -------------------------swith end ------------------------------------*/
  }
  /*  ---------------------------------    timeOut -------------------------- */
  setTimeout(() => {
    console.log({ url, table, type, query, title, parent, arg, error: "timeOut" });
    return false;
  }, 1000 * 60);
}

/* 
获取头部文件，基础参数
*/
async function first() {
  //添加头部文件
  const Pages: Promise<any>[] = [];
  [
    [`/support/index.shtml`, "head", "head"],
    // [`/products/index.shtml`, "products_asid", "products_asid"],
    [`/support/node_27.shtml`, "support_problem", "support_asid"],
    [`/support/node_25.shtml`, "support_problem_asid", "support_problem_asid"],
  ].forEach(([path, type, title]) => {
    Pages.push(Html_Serialize_Json(path, "Page", type, null, title, "support"));
  });

  //添加所有设备列表
  const Products: Promise<any>[] = [];
  [
    //[`/products/index.shtml`, "All"],
    [`/products/node_13.shtml`, "UPS电源"],
    [`/products/node_81.shtml`, "后备式UPS电源"],
    [`/products/node_82.shtml`, "高频单相UPS电源"],
    [`/products/node_83.shtml`, "高频三相UPS电源"],
    [`/products/node_85.shtml`, "工频UPS电源"],
    [`/products/node_84.shtml`, "机架式UPS电源"],
    [`/products/node_86.shtml`, "模块化UPS电源"],
    [`/products/node_87.shtml`, "UPS蓄电池"],
    [`/products/node_10.shtml`, "数据中心"],
    [`/products/node_143.shtml`, "微模块机房"],
    [`/products/node_135.shtml`, "一体化机柜"],
    ['/products/node_978.shtml', '户外一体柜ETC'],
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

  //Buy 地图area数据
  const Buy_serve = Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy",
    "buy_list",
    null,
    "buy_map",
    "销售服务中心",
    "map",
  );
  //buy_list 销售服务中心
  const Buy_serve_list = Html_Serialize_Json(
    "/about/node_37.shtml",
    "Buy_list",
    "buy_list",
    null,
    "buy_map",
    "销售服务中心",
    "child",
  );
  //Buy 地图area数据
  const Buy = Html_Serialize_Json(
    "/about/node_53.shtml",
    "Buy",
    "buy_list",
    null,
    "buy_map",
    "经销商列表",
    "map",
  );
  // 经销商列表
  const Buy_list = Html_Serialize_Json(
    "/about/node_53.shtml",
    "Buy_list",
    "buy_list",
    null,
    "buy_map",
    "经销商列表",
    "child",
  );
  const Rows = [...Pages, ...Products, ...Support, Buy, Buy_list, Buy_serve, Buy_serve_list];
  console.log(`操作数据长度${Rows.length}`);
  console.log({
    Pages: Pages.length,
    Products: Products.length,
    Support: Support.length,
  });

  await DB.Product.deleteMany({})
  await DB.Page.deleteMany({})
  await DB.Product_list.deleteMany({})
  await DB.Support.deleteMany({})
  await DB.Support_list.deleteMany({})
  await DB.Buy.deleteMany({})
  await DB.Buy_list.deleteMany({})

  for (let row of Rows) {
    const result: GMpack[] = await row;
    if (!result) continue;
    for (let sigle of result) {
      await new (DB as any)[sigle.table as string](sigle).save();
      await WriteRouter((sigle as any).title, sigle.link as string, sigle.href)
    }
  }
}
/* 
获取produceList,suportList,

*/

async function secend() {
  /* 
  supportList
  */
  const support_problem_list: supportProblem[] = await DB.Page.find({
    MainTitle: "support_problem_asid",
  }).lean();
  //获取  
  const Support_list_linkArray: string[][] = [];
  const titleSet: Set<string> = new Set()
  for (let list of support_problem_list) {
    if (!titleSet.has(list.title)) {
      // titleSet.add(list.title)
      // Support_list_linkArray.push([list.title, list.link as string, list.title, list.link as string]);
    }
    if (list.child) {
      for (let { title, link } of list.child) {
        if (!titleSet.has(title)) {
          titleSet.add(title)
          Support_list_linkArray.push([title, link as string, list.title, list.link as string]);
        }
      }
    }
  }
  //
  for (let [name, chLink, title, perantLink] of Support_list_linkArray) {
    const result = <supportList[]>await Html_Serialize_Json
      (chLink, "Support_list", "support_problem_args", null, name, title);

    for (let el of result) {
      await new DB.Support_list(el).save();
      await WriteRouter(el.title, el.link, el.href)
    }
  }
  /* 
  productsList
  */
  const Product: product[] = await DB.Product.find().lean();
  const ProductTitleSet: Set<string> = new Set()
  for (let el of Product) {
    const result = <productList[]>await Html_Serialize_Json(
      el.link,
      "Product_list",
      "products_dev_arg",
      null,
      el.title,
      el.MainTitle as string,
    )
    for (let els of result) {
      if (ProductTitleSet.has(els.title)) continue
      ProductTitleSet.add(els.title)
      await new DB.Product_list(els).save();
      await WriteRouter(els.title, els.link as string, els.href)
    }

  }
}

/* 
获取vr,case,news
*/
async function three() {
  {

    await DB.VR.deleteMany({})
    await DB.Case.deleteMany({})
    await DB.Case_list.deleteMany({})
    await DB.News.deleteMany({})
    await DB.News_list.deleteMany({})

    const vr: Promise<vr[]>[] = [];
    ["/360/node_970.shtml", "/360/node_969.shtml"].forEach(url => {
      vr.push(<Promise<vr[]>>Html_Serialize_Json(
        url,
        "VR",
        "vr",
        "vr_dev_list",
        "vr",
        "home",
      ))
    })
    //迭代vr
    for (const list of vr) {
      const lists = <vr[]>await list
      for (let row of lists) {
        await update(row);
      }
    }
  } {
    //
    const Case: Promise<cases[]>[] = [];
    Case.push(
      <Promise<cases[]>>Html_Serialize_Json("/case/index.shtml",
        "Case",
        "case",
        null,
        "case_list",
        "home"
      )
    );
    for (let i = 2; i < CaseNum; i++) {
      Case.push(
        <Promise<cases[]>>Html_Serialize_Json(`/case/index_${i}.shtml`,
          "Case",
          "case",
          null,
          "case_list",
          "home"
        )
      );
    }
    //等待解析
    //CaseObject是case页面的标题列表,CaseList是详细内容content async
    for (let cases of Case) {
      const caselist = <cases[]>await cases
      if (caselist) {
        for (let caseLi of caselist) {
          // ［一体化机柜］
          const parenName = caseLi.name.replace("［", "").replace("］", "")
          caseLi.MainTitle = parenName
          caseLi.date = caseLi.time.replace("年", "/")
            .replace("月", "/")
            .replace("日", "/")
          await update(caseLi)
          let li = <caseList>await Html_Serialize_Json
            (caseLi.link, "Case_list", "case_list", null, caseLi.text, parenName)
          li.link = caseLi.link
          li.href = caseLi.href

          await update(li)
        }
      }

    }
  } {
    // news
    for (let i = 2; i < NewsNum; i++) {
      const NewsObjects = <cases[]>await Html_Serialize_Json(`/news/index_2_${i}.shtml`,
        "News",
        "news",
        null,
        "news_list",
        "home"
      );
      if (!NewsObjects) continue;
      for (const NewsObject of NewsObjects) {
        // ［一体化机柜］
        const parenName = NewsObject.name.replace("［", "").replace("］", "")
        NewsObject.MainTitle = parenName
        NewsObject.date = NewsObject.time.replace("年", "/")
          .replace("月", "/")
          .replace("日", "/")
        await update(NewsObject);
        //
        let NewsList = <caseList>await Html_Serialize_Json(
          NewsObject.link,
          "News_list",
          "news_list",
          null,
          NewsObject.text,
          parenName
        );
        if (!NewsList) continue
        NewsList.link = NewsObject.link
        NewsList.href = NewsObject.href
        await update(NewsList);

      }
    }
  }
  async function update(row: cases | caseList) {
    if (!row) return
    await new (DB as any)[row.table as string](row).save()
    await WriteRouter(row.title, row.link as string, row.href)
  }
}
first().then(async () => {
  await secend()
  await three()

  console.log(errorArray);
  
  process.exit()
});

function htmlParse(html: string | null) {
  //return decoder.feed(html?.replace(/\/n/g, "").replace(/(div|font)/g, "span").trim())
  //return decoder.feed(html?.replace(/\/n/g, "").trim())
  return decoder.feed(html?.replace(/\/n/g, "").trim())
}

async function WriteRouter(title: string, rout: string, href?: string) {
  if (!rout) return
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
  if (!out.includes(rout))
    if (!title) title = rout.split("/").pop() as string
  const result = await DB.Router.updateOne({ rout }, { $set: { title, href } }, { upsert: true })
  return result
}
