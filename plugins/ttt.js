/* jshint esversion:8 */
const axios = require("axios");

async function get() {
  var a = await axios.get("http://localhost:3000/api/GET_router");
  //console.log(a.data);

  Object.values(a.data).forEach(element => {
    if (element.route.includes("莆田数据中心模块化机房工程设计装修建设安装维护运营")) console.log(element);
  });
}
get();
