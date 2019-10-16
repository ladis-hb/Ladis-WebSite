/* jshint esversion:8 */
const cheerio = require("cheerio");
const Axios = require("axios");
const DB = require("../server/mongoose/content");

const Router_Address = [];
const Host = "http://www.ladis.com.cn";

/**
 *
 *
 * @param {*} {
 *   url,
 *   table,
 *   type,
 *   query,
 *   title,
 *   parent,
 *   arg = null
 * }
 * @returns
 */
async function Html_Serialize_Json({
  url,
  table,
  type,
  query,
  title,
  parent,
  arg = null
}) {
  //console.log(Host + url);
  var file;
  try {
    file = await Axios.get(Host + url);
  } catch (error) {
    //console.log(error.Error || error);
    return true;
  }

  var $ = cheerio.load(file.data);
  var result = {
    parent: parent,
    title: title, //文档标题
    date: new Date(),
    table: table,
    data: []
  };
  switch (type) {
    //360
    case "case":
    case "vr":
    case "news":
      //console.log("start serize 360");
      {
        let list = $("#listPc").find(".new_list");
        let map = [];
        list.each(function() {
          let img = $(this)
            .find(".new_list_img img")
            .attr("src");
          let name = $(this)
            .find(".new_list_con .typeAndTime .type_name")
            .text();
          let time = $(this)
            .find(".new_list_con .typeAndTime .type_time")
            .text();
          let text = $(this)
            .find(".new_list_con .new_title_list")
            .text();
          let link = $(this)
            .find(".new_list_con .new_details a")
            .attr("href");
          let linkText = $(this)
            .find(".new_list_con .new_details a")
            .text();
          let href = `/${table}/${text}`;
          Router_Address.push(href);
          map.push({
            img,
            name,
            time,
            text,
            link,
            href,
            linkText
          });
        });

        result.data = map;
      }
      break;
    //case list
    case "case_list":
    case "news_list":
      console.log(`start ${type}/${title}`);

      let dock = { text: [], pic: [] };
      let list = $(".MsoNormal");
      list.each(function() {
        let text = $(this)
          .find("font")
          .text();
        let pic = $(this)
          .find("img")
          .attr("src");
        if (text && text.trim() != "") dock.text.push(text);
        if (pic) dock.pic.push(pic);
      });
      //list2
      let list2 = $(".new_list_outer p");
      list2.each(function() {
        let text = $(this).text();
        let pic = $(this)
          .find("img")
          .attr("src");
        if (text && text.trim() != "") dock.text.push(text);
        if (pic) dock.pic.push(pic);
      });
      result.data = dock;
      break;
  }
  return result;
}

async function start() {
  const vr = [];
  vr.push(
    await Html_Serialize_Json({
      url: "/360/node_970.shtml",
      table: "VR",
      type: "vr",
      title: "vr_dev_list",
      parent: "home"
    })
  );
  vr.push(
    await Html_Serialize_Json({
      url: "/360/node_969.shtml",
      table: "VR",
      type: "vr",
      title: "vr_house_list",
      parent: "home"
    })
  );
  const Case = [];
  Case.push(
    Html_Serialize_Json({
      url: "/case/index.shtml",
      table: "Case",
      type: "case",
      title: "case_list",
      parent: "home"
    })
  );
  for (let i = 2; i < 11; i++) {
    Case.push(
      Html_Serialize_Json({
        url: `/case/index_${i}.shtml`,
        table: "Case",
        type: "case",
        title: "case_list",
        parent: "home"
      })
    );
  }
  let CaseArray = await Promise.all(Case);
  let dataArray = [];
  CaseArray.forEach(element => {
    dataArray = [...dataArray, ...element.data];
  });
  //let CaseObject = [Object.assign(CaseArray[0], { data: dataArray })];
  let CaseObject = dataArray.map(data => {
    let timeString = data.time;
    timeString = timeString.replace("年", "/");
    timeString = timeString.replace("月", "/");
    timeString = timeString.replace("日", "/");
    return Object.assign(
      {
        table: "Case",
        date: new Date(timeString),
        title: data.text,
        parent: "home"
      },
      { data }
    );
  });
  //获取case案例网址链接

  let CaseList = dataArray.map(element => {
    return Html_Serialize_Json({
      url: element.link,
      table: "Case_list",
      type: "case_list",
      title: element.text,
      parent: "case"
    });
  });

  //news
  const News = [];
  for (let i = 2; i < 261; i++) {
    News.push(
      Html_Serialize_Json({
        url: `/news/index_2_${i}.shtml`,
        table: "News",
        type: "news",
        title: "news_list",
        parent: "home"
      })
    );
  }
  let NewsArray = await Promise.all(News);
  let NewsDataArray = [];
  NewsArray.forEach(element => {
    NewsDataArray = [...NewsDataArray, ...element.data];
  });
  //let NewsObject = [Object.assign(NewsArray[0], { data: NewsDataArray })];
  let NewsObject = NewsDataArray.map(data => {
    let timeString = data.time;
    timeString = timeString.replace("年", "/");
    timeString = timeString.replace("月", "/");
    timeString = timeString.replace("日", "/");
    return Object.assign(
      {
        table: "News",
        date: new Date(timeString),
        title: data.text,
        parent: "home"
      },
      { data }
    );
  });

  //获取news案例网址链接
  //下面请求并发数太高，使用同步写法
  let newLength = NewsDataArray.length;
  let ni = 1;
  console.log(`new_list迭代数据长度${newLength}`);
  let NewsList = [];
  for (let element of NewsDataArray) {
    console.log(
      ni >= newLength
        ? `new_list已迭戈完成`
        : `当前迭代${ni++}/${newLength},迭代位：${element.text}`
    );
    NewsList.push(
      await Html_Serialize_Json({
        url: element.link,
        table: "News_list",
        type: "news_list",
        title: element.text,
        parent: "news"
      })
    );
  }

  Promise.all([...vr, ...CaseObject, ...CaseList, ...NewsObject, ...NewsList])
    .then(Rows => {
      console.log(`操作数据长度${Rows.length}`);

      Rows.forEach(element => {
        let { parent, title, date, table, data } = element;
        if (!table) return console.log(element);
        //console.log(table);

        DB[table]
          .updateOne(
            { title },
            { $set: { parent, date, table, data } },
            { upsert: true }
          )
          .then(res => {
            console.log(res);
          });
      });
    })
    .catch(e => {
      console.log(e);
    });

  //写入router记录

  Router_Address.forEach(val => {
    DB.Router.updateOne(
      { rout: val },
      { $set: { rout: val } },
      { upsert: true }
    );
  });
}
//start();

[
  {
    title: "公司简介",
    body: [
      " 杭州蓝光电子有限公司旗下品牌雷迪司，致力于提供高效节能的电源、制冷、配电等数据中心机房一体化解决方案。产品涉及UPS不间断电源、智能配电、PDU、消防、精密空调、机柜、动环监控、一体化机柜、微模块等产品。同时提供物联网解决方案，包含数据中心运维云平台、智慧安全用电云平台等。",
      "公司获得ISO9001质量管理体系认证、ISO14001环境管理体系认证、OHSAS18001职业健康管理体系认证，产品方面获得泰尔认证、节能认证、3C认证、CE认证等相关证书。先后在北京、上海、杭州、成都、深圳、西安成立六大运维中心，各省会、地级市成立销售服务中心，提供新品仓储和备件库以及机房服务，保证及时供货和快捷完善的售后服务。"
    ]
  },
  {
    title: "服务承诺",
    body: [
      "雷迪司服务承诺：秉承“品质至上、力求客户满意”的理念，建立起了全方位、高品质、规范的客户服务体系。400-6655-778免费咨询电话，第一时间为用户答疑解惑；售前，雷迪司能够针对用户的环境和设备要求，提供个性化的解决方案；在产品售出后，雷迪司会派出专业人员会为用户进行实际操作等诸多方面的培训，并与用户保持密切联系，随时响应用户要求。全国各地的服务站还会定期为用户的设备进行检测和养护。用户在产品使用中，遇到任何问题，雷迪司保证在8小时内做出反应，并提供及时和高质量的维修或者更换服务。"
    ]
  },
  {
    title: "经营理念",
    body: [
      "雷迪司经营理念：依托互联网和实体网点相结合，为用户提供高性价比的产品与快捷完善的售后服务。"
    ]
  },
  {
    title: "加入我们",
    body: ["投资人招募"]
  },
  {
    title: "联系我们",
    body: ["服务热线：400-6655-778 "]
  }
].forEach(el => {
  DB.About.updateOne({ title: el.title }, { $set: el }, { upsert: true }).then(
    res => {
      console.log(res);
    }
  );
});
