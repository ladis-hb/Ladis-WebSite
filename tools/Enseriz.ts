/* jshint esversion:8 */
import { load } from "cheerio";
import Axios from "axios";
import * as DB from "../server/mongoose/content";
import {
  GMlink,
  GMpack,
  product,
  productContentOld,
  productList,
  support,
  DbTables,
  cases,
  caseList,
} from "./typing";

const Host: string = "http://en.ladis.com.cn";
const CaseNum = 4

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

  // if (!url) console.log(defaults);

  const file = await Axios.get(Host + url)
    .then(res => res.data)
    .catch(e => {

      console.log({ url, table, type, query, title, parent, arg, error: "axios error" });
      return false
    });
  if (!file) return false
  const $ = load(file);
  // 通用获取页面标题，key，des
  {
    const keys = ['keywords', 'description']
    defaults.PageTitle = $("title").text().split("-")[0].trim()
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

    /* -----------------------------------Products   ------------------------------------------------------ */
    case "products": {
      const result: product[] = [];
      console.log(`抓取products信息`);
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
        console.log(`抓取products_dev_arg信息`);

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
          head: $(".printDisplay_para").html() as string,
          body: $(".responseWidth").html() as string
        };
        result.push(data);
        return result;
      }
    /* -----------------------------------Support ------------------------------------------------------ */
    //Support

    //抓取support页面软件下载
    case "support_down": {
      console.log(`support_down`);
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

    /* -----------------------------vr ,case,news---------------------------------- */
    //360
    case "case":
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
      {

        const dock: caseList = { ...defaults, title, text: [], pic: [] };
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
        return dock;
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
  //添加所有设备列表
  const Products: Promise<any>[] = [];
  [
    //[`/products/index.shtml`, "All"],
    [`/products/node_309.shtml`, "UPS电源"],
    [`/products/node_310.shtml`, "后备式UPS电源"],
    [`/products/node_311.shtml`, "高频单相UPS电源"],
    [`/products/node_312.shtml`, "高频三相UPS电源"],
    [`/products/node_313.shtml`, "工频UPS电源"],
    [`/products/node_314.shtml`, "机架式UPS电源"],
    [`/products/node_315.shtml`, "模块化UPS电源"],
    [`/products/node_316.shtml`, "UPS蓄电池"],
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

  await DB.EnProduct.deleteMany({})
  await DB.EnPage.deleteMany({})
  await DB.EnProduct_list.deleteMany({})
  await DB.EnSupport.deleteMany({})
  await DB.EnSupport_list.deleteMany({})
  await DB.EnBuy.deleteMany({})
  await DB.EnBuy_list.deleteMany({})
  await DB.EnVR.deleteMany({})
  await DB.EnCase.deleteMany({})
  await DB.EnCase_list.deleteMany({})
  await DB.EnNews.deleteMany({})
  await DB.EnNews_list.deleteMany({})
  const Rows = [...Products, ...Support];
  console.log(`操作数据长度${Rows.length}`);
  for (let row of Rows) {
    const result: GMpack[] = await row;
    if (!result) continue;
    for (let sigle of result) {
      await new (DB as any)['En' + sigle.table](sigle).save();
    }
  }
}
/* 
获取produceList,suportList,

*/

async function secend() {

  /* 
  productsList
  */
  const Product: product[] = await DB.EnProduct.find().lean();
  console.log(`遍历ProductList，count:${Product.length}`);
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
      await new DB.EnProduct_list(els).save();
    }

  }
  console.log(`遍历ProductList，重复Set:${ProductTitleSet.size}`);
  console.log("Get_Product_list Success ++++++++++++++");

}

/* 
获取vr,case,news
*/
async function three() {
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
    console.log(`操作 news success`);
  }
  async function update(row: cases | caseList) {
    if (!row) return
    console.log(`开始迭代，写入表：${row.table},操作title:${row.title}`);
    await new (DB as any)["En" + row.table](row).save()
  }
}
first().then(async () => {
  await secend()
  await three()
  process.exit()
});

