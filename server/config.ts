import { Agents } from "../types/typing";

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
  { name: "深圳市雷迪司电源有限公司", url: "www.szladis.com.cn" },
  { name: "雷迪司网络能源(深圳)有限公司", url: "www.gdladis.cn" },
  { name: "遵义雷迪司", url: "www.zyups.cn" },
  { name: '贵州毕节雷迪司', url: 'bijie.gzjifang.com' },
  { name: '贵州安顺雷迪司', url: 'anshun.gzjifang.com' },
  { name: '贵州都匀雷迪司', url: 'duyun.gzjifang.com' },
  { name: '贵州六盘水雷迪司', url: 'liupanshui.gzjifang.com' },
  { name: '贵州铜仁雷迪司', url: 'tongren.gzjifang.com' },
  { name: '贵州兴义雷迪司', url: 'xingyi.gzjifang.com' },
  { name: '贵州凯里雷迪司', url: 'kaili.gzjifang.com' },
  { name: '陕西雷迪司', url: 'www.xaladis.com' },
  { name: '河北雷迪司', url: 'www.hbladis.com' },
  { name: '福州雷迪司通电子有限公司', url: 'www.ladups.com' },
  { name: '浙江雷迪司', url: 'www.hz-ups.com' },
  { name: '成都雷迪司电子有限公司', url: 'www.cdlads.com' },
  { name: '沈阳雷迪司', url: 'www.syladis.com' }
];
