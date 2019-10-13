/* jshint esversion:8 */
const fs = require("fs");
const cheerio = require("cheerio");
const Mongo = require("./MongoDB");
const Axios = require("axios");
const dbm = require("./DB_mongo")("ladis");

const mongo_pages = new Mongo("", "ladis", "pages");
const mongo_router = new Mongo("", "ladis", "router");

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
      table: "vr",
      type: "vr",
      title: "vr_dev_list",
      parent: "home"
    })
  );
  vr.push(
    await Html_Serialize_Json({
      url: "/360/node_969.shtml",
      table: "vr",
      type: "vr",
      title: "vr_house_list",
      parent: "home"
    })
  );
  const Case = [];
  Case.push(
    Html_Serialize_Json({
      url: "/case/index.shtml",
      table: "case",
      type: "case",
      title: "case_list",
      parent: "home"
    })
  );
  for (let i = 2; i < 11; i++) {
    Case.push(
      Html_Serialize_Json({
        url: `/case/index_${i}.shtml`,
        table: "case",
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
    timeString = timeString.replace("年","/");
    timeString = timeString.replace("月","/");
    timeString = timeString.replace("日","/");
    return Object.assign(
      { table: "case", date: new Date(timeString), title:data.text, parent: "home" },
      { data }
    );
  });
  //获取case案例网址链接
   
  let CaseList = dataArray.map(element => {
    return Html_Serialize_Json({
      url: element.link,
      table: "case_list",
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
        table: "news",
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
    timeString = timeString.replace("年","/");
    timeString = timeString.replace("月","/");
    timeString = timeString.replace("日","/");
    return Object.assign(
      { table: "news", date: new Date(timeString), title:data.text, parent: "home" },
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
        table: "news_list",
        type: "news_list",
        title: element.text,
        parent: "news"
      })
    );
  }
 
  Promise.all([
     ...vr, ...CaseObject, ...CaseList, ...NewsObject,  ...NewsList  
  ])
    .then(Rows => {
      console.log(`操作数据长度${Rows.length}`);

      Rows.forEach(element => {
        let { parent, title, date, table, data } = element;
        if (!table) {
          return console.log(element);
        }
        dbm
          .then(db => {
            db.collection(table).updateOne(
              { title },
              { $set: { parent, date, table, data } },
              { upsert: true }
            );
          })
          .catch(e => {
            console.log(e);
          });
      });
    })
    .catch(e => {
      console.log(e);
    });

  //写入router记录

  Router_Address.map(val => {
    dbm.then(db => {
      db.collection("router").updateOne(
        { rout: val },
        { $set: { modifyTime: new Date() } },
        { upsert: true }
      );
    });
  });
  return true;
}
start();
