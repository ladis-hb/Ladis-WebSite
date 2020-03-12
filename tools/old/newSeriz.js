/* jshint esversion:8 */
const cheerio = require("cheerio");
const Axios = require("axios");
const DB = require("../../server/mongoose/content");

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
    return false;
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
      // console.log(`start ${type}/${title}`);

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
    //获取news页面数量
    /* case "news_lenght":
      let text = ""
      let li = $("#CMS_TX_PageDown").text();
      console.log(li);
      
      li.each(function(){
        text=$(this).text()
      }).text();
      let texts = [...text.split("/")[1]];
      texts.pop();
      result.data = Number(texts.join("")) + 1;
      break; */
  }
  /* setTimeout(() => {
    
    console.log(`处理超时，${result.title}++${result.type}`);

    return result;
  }, 2000); */
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
  //迭代vr
  for (const iterator of vr) {
    await update(iterator);
  }
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
  //等待解析
  //CaseObject是case页面的标题列表,CaseList是详细内容content async
  let { CaseObject, CaseList } = await Promise.all(Case).then(el => {
    let CaseObject = el
      .reduce((pre, cu) => {
        if (Array.isArray(pre)) return [...pre, ...cu.data];
        return [...cu.data];
      })
      .map(data => {
        return {
          table: "Case",
          date: new Date(
            data.time
              .replace("年", "/")
              .replace("月", "/")
              .replace("日", "/")
          ),
          title: data.text,
          parent: "home",
          data
        };
      });
    let CaseList = CaseObject.map(({ data }) =>
      Html_Serialize_Json({
        url: data.link,
        table: "Case_list",
        type: "case_list",
        title: data.text,
        parent: "case"
      })
    );

    return { CaseObject, CaseList };
  });
  for (const iterator of [...CaseObject, ...CaseList]) {
    await update(iterator);
  }
  console.log(
    `迭代case success==CaseObject：${CaseObject.length}, CaseList:${CaseList.length}`
  );

  for (let i = 2; i < 333; i++) {
    let NewsObjects = await Html_Serialize_Json({
      url: `/news/index_2_${i}.shtml`,
      table: "News",
      type: "news",
      title: "news_list",
      parent: "home"
    });
    if (!NewsObjects) continue;
    for (const NewsObject of NewsObjects.data) {
      let obj = {
        table: "News",
        date: new Date(
          NewsObject.time
            .replace("年", "/")
            .replace("月", "/")
            .replace("日", "/")
        ),
        title: NewsObject.text,
        parent: "home",
        data: NewsObject
      };
      await update(obj);
      //
      let NewsList = await Html_Serialize_Json({
        url: NewsObject.link,
        table: "News_list",
        type: "news_list",
        title: NewsObject.text,
        parent: "news"
      });
      if (!NewsList) continue;
      await update(NewsList);
    }
  }
  console.log(`迭代new success==NewsObject, NewsList`);

  console.log(`操作success`);
  async function update(row) {
    let { parent, title, date, table, data } = await row;
    console.log(`开始迭代，写入表：${table},操作title:${title}`);
    if (!table) return console.log({ row, a: "test" });
    if (title == "精密空调的检测项目都有什么？") console.log(row);

    await DB[table]
      .updateOne(
        { title },
        { $set: { parent, date, table, data } },
        { upsert: true }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  //
  Router_Address.forEach(rout => {
    console.log(`写入router记录${rout}`);
    DB.SaveRouter({ rout });
  });
  console.log("New Serize Success ++++++++++++++");
}
start();

