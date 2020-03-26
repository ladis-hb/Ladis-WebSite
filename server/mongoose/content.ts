/* jshint esversion:8 */
import { mongooses as mongoose, Schema } from "./momgoose";

const Schema_Product = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  title: { type: String, trim: true },
  img: String,
  link: String,
});

const Schema_Product_list = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  title: { type: String, trim: true },
  link: String,
  t1: { type: "Mixed" },
  t2: { type: "Mixed" },
  head: String,
  body: String,
  img: [String],
  down: { type: "Mixed" },
});

const Schema_Support = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  link: String,
  language: String,
  type: String,
  title: { type: String, trim: true },
  platform: String,
  size: String,
  version: String,
  updateReason: String,
  down: String,
});

const Schema_Support_list = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  title: { type: String, trim: true },
  link: String,
  movie: String,
  html: String,
  parentsUntil: String,
  parent: String,
  data: String,
});

const Schema_Buy = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  link: String,
  alt: String,
  shape: String,
  coords: String,
});

const Schema_Buy_list = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  parentsUntil: String,
  link: String,
  parent: String,
  title: { type: String, trim: true },
  content: String,
});

const Schema_VR = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  img: String,
  name: String,
  time: String,
  text: String,
  link: String,
  linkText: String,
});

const Schema_CaseNews = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  img: String,
  name: String,
  time: String,
  text: String,
  link: String,
  linkText: String,
});

const Schema_CaseNews_list = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  title: { type: String, trim: true },
  link: String,
  text: [String],
  pic: [String],
});
//about

const Schema_About = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  link: String,
  title:String,
  content:[new Schema({
    body: String,
    webSite:String
  },{_id:false}) ]
});

const Schema_Page = new Schema({
  MainUrl: { type: String, trim: true },
  MainTitle: { type: String, trim: true },
  MainParent: { type: String, trim: true },
  date: String,
  table: String,
  href: String,
  title: { type: String, trim: true },
  link: String,
  args: { type: "Mixed" },
  child: { type: "Mixed" },
});
const Schema_Router = new Schema({
  title: String,
  rout: String,
  href: String,
});

const Product = mongoose.model("Product", Schema_Product);
const Product_list = mongoose.model("Product_list", Schema_Product_list);
const Support = mongoose.model("Support", Schema_Support);
const Support_list = mongoose.model("Support_list", Schema_Support_list);
const Buy = mongoose.model("Buy", Schema_Buy);
const Buy_list = mongoose.model("Buy_list", Schema_Buy_list);
const VR = mongoose.model("VR", Schema_VR);
const Case = mongoose.model("Case", Schema_CaseNews);
const Case_list = mongoose.model("Case_list", Schema_CaseNews_list);
const News = mongoose.model("New", Schema_CaseNews);
const News_list = mongoose.model("News_list", Schema_CaseNews_list);
const About = mongoose.model("about", Schema_About);
const Page = mongoose.model("Page", Schema_Page);
const Router = mongoose.model("Router", Schema_Router);
// 英文版
const EnProduct = mongoose.model("EnProduct", Schema_Product);
const EnProduct_list = mongoose.model("EnProduct_list", Schema_Product_list);
const EnSupport = mongoose.model("EnSupport", Schema_Support);
const EnSupport_list = mongoose.model("EnSupport_list", Schema_Support_list);
const EnBuy = mongoose.model("EnBuy", Schema_Buy);
const EnBuy_list = mongoose.model("EnBuy_list", Schema_Buy_list);
const EnVR = mongoose.model("EnVR", Schema_VR);
const EnCase = mongoose.model("EnCase", Schema_CaseNews);
const EnCase_list = mongoose.model("EnCase_list", Schema_CaseNews_list);
const EnNews = mongoose.model("EnNew", Schema_CaseNews);
const EnNews_list = mongoose.model("EnNews_list", Schema_CaseNews_list);
const EnAbout = mongoose.model("Enabout", Schema_About);
const EnPage = mongoose.model("Page", Schema_Page);

export default {
  Product,
  Product_list,
  Support,
  Support_list,
  Buy_list,
  Buy,
  VR,
  Case,
  Case_list,
  News,
  News_list,
  About,
  Page,
  Router,

  EnProduct,
  EnProduct_list,
  EnSupport,
  EnSupport_list,
  EnBuy_list,
  EnBuy,
  EnVR,
  EnCase,
  EnCase_list,
  EnNews,
  EnNews_list,
  EnAbout,
  EnPage
};
