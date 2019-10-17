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

  await Promise.all([
    ...vr,
    ...CaseObject,
    ...CaseList,
    ...NewsObject,
    ...NewsList
  ])
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
  console.log("New Serize Success ++++++++++++++");
  //写入router记录

  Router_Address.forEach(rout => {
    DB.Router.updateOne({ rout }, { $set: { rout } }, { upsert: true });
  });
}
start();

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
  },
  {
    title: "使用声明",
    body: [
      `欢迎您浏览和使用本网站，在您使用本网站前，请您务必仔细阅读本声明。如果您使用本网站，您的使用行为将被视为对本声明全部内容的认可。
    本网站不保证所提供信息和内容的准确性和及时性，对应用本网站的行为和后果不承担任何责任，您应遵守相关法律法规的规定访问或使用本网站或其相关信息，并自行承担由此产生的任何法律责任。
    本网站有权对网站上所载内容的全部或部分进行修改或删除而无需事先公告，对网站内容也不负有定期或不定期更新的义务。对链接的第三方网站及其内容不负任何义务，也不承担任何责任，访问、使用这些网站所产生的后果由您自行负责。
    有关本网站的声明、诉讼或应用等适用中华人民共和国法律并按中华人民共和国法律解释`
    ]
  },
  {
    title: "隐私政策",
    body: [
      `范围
    雷迪司隐私政策适用于与该"声明"相链接的雷迪司中文及海外Web 站点。以下是该声明的一些要点。
个人信息
     我们向您收集个人信息是出于多方面原因，例如为与您联系、为您提供订阅服务或处理工作应聘。
我们可能会将从您这里获取的信息与从其他来源获得的信息相结合，来帮助我们提高信息的整体准确性和完整性，并帮助我们更好地处理与您之间的互动。
    此外，我们可能还会通过各种技术（包括 Cookie）来收集与您使用我们 Web 站点相关的信息。
雷迪司将维护所采集信息的保密性。我们通过限制获得和使用上述信息的员工范围，建立良好的内部机制来更好的保护上述信息的安全性和保密性。
    对于可用于识别用户的个人信息以外的其他信息（以下统称信息）均将被视为非保密和非专有的。
    雷迪司将对这些信息不承担任何责任。同时您的提交行为如果没有特别声明，
    我们可视为同意（或授权）：雷迪司及其授权人将可因商业或非商业的目的自由复制、透露、分发、合并
    和以其他方式利用这些信息和所有数据、图像、声音、文本及其他内容。
    您对本站的使用不得违背法律法规及公众道德，
    不得向或从本站邮寄或发送任何非法、威胁、诽谤、中伤、淫秽、色情或其他可能违法的材料。
    若相关人对此信息的内容及影响提出确有证据的警告或异议，本站可随时删除该内容或信息，
    并永远终止该信息的网上发布，而不必事先取得提交者的同意，
    也无义务事后通知提交者，情况严重的，本站可采取注销该用户的措施。
用途
    供我们或其他相关方使用，以满足您的请求。
    用于与您保持联系，以开展客户满意度调查、市场研究或某些交易的处理。
    支持您从我们这里获得的产品或服务。
    个性化您在我们站点时的体验、使导航更加便捷并用于 Web 站点使用统计。
您的选择权
    当我们向您收集信息时，您可以告诉我们不要将这些信息用于其它的市场营销活动。
    您也可以在浏览器中关闭 cookie。
关于第三方网站的链接
    本网包含指向其它网站的链接。对于其它网站的隐私权措施，我们不承担任何责任。
    我们建议用户在离开我们的网站时应留意阅读收集个人识别信息的每个网站上的隐私权声明。
    本隐私权声明仅适用于本网上收集的信息。

关于苹果APP政策
    为切实保护app用户隐私权，优化用户体验，本《用户隐私协议》将详细说明app在获取、
    管理及保护用户个人信息方面的政策及措施。本《用户隐私协议》适用于app向您提供的所有服务，
    无论您是通过计算机设备、移动终端或其他设备获得的app服务。
    个人信息的收集 您已知悉且同意，在您注册app帐号或使用app提供的服务时，
    app将记录您提供的相关个人信息，如：姓名、手机号码等，上述个人信息是您获得app提供服务的基础。
    同时，基于优化用户体验之目的，app会获取与提升app服务有关的其他信息，例如当您访问app时，
    我们可能会收集哪些服务的受欢迎程度、浏览器软件信息等以便优化我们的服务。
    个人信息的管理 为了向您提供更好的服务或产品，app会在下述情形使用您的个人信息：
     1）根据相关法律法规的要求；
2）根据您的授权；
3）根据app相关服务条款、应用许可使用协议的约定。
此外，您已知悉并同意：在现行法律法规允许的范围内，app可能会将您非隐私的个人信息用于市场营销，
使用方式包括但不限于：在app平台中向您展示或提供广告和促销资料，向您通告或推荐app的服务或产品信息，
以及其他此类根据您使用app服务或产品的情况所认为您可能会感兴趣的信息。
其中也包括您在采取授权等某动作时选择分享的信息，例如当您分享文章时。
 未经您本人允许，app不会向任何第三方披露您的个人信息，
 下列情形除外：
1）app已经取得您或您监护人的授权；
2）司法机关或行政机关给予法定程序要求app披露的；
3)app为维护自身合法权益而向用户提起诉讼或仲裁时；
4）根据您与app相关服务条款、应用许可使用协议的约定；
5）法律法规规定的其他情形。
    个人信息的保护 app将尽一切合理努力保护其获得的用户个人信息。
    为防止用户个人信息在意外的、未经授权的情况下被非法访问、复制、修改、传送、遗失、破坏、
    处理或使用，app已经并将继续采取以下措施保护您的个人信息：
1）以适当的方式对用户的个人信息进行加密处理；
2）在适当的位置使用密码对用户个人信息进行保护；
3）限制对用户个人信息的访问；
4）其他的合理措施。
尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，
但app仍然无法保证您的个人信息通过不安全途径进行交流时的安全性。因此，
用户个人应采取积极措施保证个人信息的安全，如：定期修改帐号密码，
不将自己的帐号密码等个人信息透露给他人。
 您知悉：app提供的用户隐私措施仅适用于app平台，一旦您离开app，浏览或使用其他网站、服务及内容资源，
 app即没有能力及义务保护您在app以外的网站提交的任何个人信息，
 无论您登陆或浏览上述网站是否基于app的链接或引导。
    个人信息的访问 当您完成app的帐号注册后，您可以查阅或修改您提交给app的个人信息。
    一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，
    您可能无法修改注册时提供的某些初始注册信息及验证信息。 
    对Cookie及web beacon的使用 Cookie可以帮助网站辨认注册用户，计算用户数量，
    通常被各网站用来判定完成注册的用户是否已经实现登录。app承诺，
    对cookie信息的研究仅用于提升服务/产品质量及优化用户体验之目的。
    同时，如不希望个人信息保留在cookie中，
    您可以对浏览器进行配置：选择“拒绝cookie”或“当网站发送cookie时通知您”，
    您知道，鉴于app的服务是通过支持cookie来是实现的，完成关闭cookie的操作后，
    可能影响到您访问app或不能充分取得app的服务。您不禁用cookie时，
    可能会得到提示：是否在下一次进入此网站时保留用户信息以便简化登录手续（如一键登录）。
     app使用web beacon的方法和目的与cookie是相同的。
      对未成年人个人信息的特别保护 app非常重视对未成年人个人信息的保护。
      若您是18周岁以下的未成年人，在使用app的服务前，应确保事先取得监护人的同意，
      如您在app上申请注册账号，app将默认为您已得到前述同意。
      app将根据国家相关法律法规及本《用户隐私协议》的规定保护未成年人的个人信息 
      隐私保护政策的修改 app有权随时修改《用户隐私协议》的任何条款，
      一旦《用户隐私协议》的内容发生变动，app将会直接在微博网站上公布修改之后的《用户隐私协议》，
      该公布行为视为app已经通知您修改内容。app也可通过其他适当方式向用户提示修改内容。
      如果您不同意app对本《用户隐私协议》相关条款所做的修改，您有权停止使用app服务。
      如果您继续使用app服务，则视为您接受本协议相关条款所做的修改。`
    ]
  }
].forEach(el => {
  DB.About.updateOne({ title: el.title }, { $set: el }, { upsert: true }).then(
    res => {
      console.log(res);
    }
  );
});
