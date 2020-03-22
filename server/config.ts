import { Agents } from "./typing/interface";

export const Collection = {
  user: "admin_User",
  head: "head",
  router: "router",
  products: "products",
  pages: "pages",
  buy: "buy",
  buy_list: "buy_list",
  users: "users",
  Products_list: "products_list",
  support: "support",
  support_list: "support_list",
  case: "case",
  case_list: "case_list",
  news: "news",
  news_list: "news_list",
};
//通用加密密匙
export const key = "7e1977739c748beac0c0fd14fd26a544";
// 经销商
export const Agent: Agents[] = [
  {
    name: "localhost",
    url: "www.ladis.com.cn",
  },
  { name: "湖北雷迪司", url: "www.ladishb.com" },
  { name: "贵州代理商", url: "" },
  { name: "陕西代理商", url: "" },
];
