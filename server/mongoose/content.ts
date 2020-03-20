/* jshint esversion:8 */
import { mongooses as mongoose, Schema } from "./momgoose"

const Schema_Product = new Schema(
  {
    title: String,
    data: [
      {
        title: { type: String },
        href: { type: String },
        img: { type: String },
        link: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Schema_Product_list = new Schema(
  {
    parent: String,
    title: String,
    data: {type:"Mixed"}
      /* {
      t1: { type: "Mixed" },
      t2: { type: "Mixed" },
      img: [String],
      down: ["Mixed"]
    } */
  },
  { timestamps: true }
);

const Schema_Support = new Schema(
  {
    parent: String,
    title: String,
    data: [
      {
        type: { type: String },
        title: { type: String },
        date: { type: String },
        platform: { type: String },
        language: { type: String, default: "简体中文" },
        size: { type: String },
        version: { type: String },
        updateReason: { type: String },
        down: { type: String },
        href: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Schema_Support_list = new Schema(
  {
    title: { type: String },
    link: { type: String },
    href: { type: String },
    movie: String,
    html: { type: String },
    date: { type: Date, default: new Date() },
    parentsUntil: { type: String },
    parent: { type: String },
    data: {type:"Mixed"}
  },
  { timestamps: true }
);

const Schema_Buy = new Schema(
  {
    title: { type: String },
    data:{type:"Mixed"}
       /* {
      alt: { type: String },
      shape: { type: String },
      coords: { type: String },
      href: { type: String }
    } */,
    date: { type: Date, default: new Date() },
    parent: { type: String }
  },
  { timestamps: true }
);

const Schema_Buy_list = new Schema(
  {
    title: { type: String },
    data:{type:"Mixed"}
       /* {
      parentsUntil: { type: String },
      link: { type: String },
      parent: { type: String },
      title: { type: String },
      content: { type: String },
      table: { type: String }
    } */,
    date: { type: Date, default: new Date() },
    parent: { type: String }
  },
  { timestamps: true }
);

const Schema_VR = new Schema(
  {
    parent: { type: String },
    title: { type: String },
    date: { type: Date, default: new Date() },
    data: [
      {
        img: { type: String },
        name: { type: String },
        time: { type: String },
        text: { type: String },
        link: { type: String },
        href: { type: String },
        linkText: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Schema_CaseNews = new Schema(
  {
    title: { type: String },
    data:{type:"Mixed"}
       /* {
      img: { type: String },
      name: { type: String },
      time: { type: String },
      text: { type: String },
      link: { type: String },
      href: { type: String },
      linkText: { type: String }
    } */,
    date: { type: Date, default: new Date() },
    parent: { type: String }
  },
  { timestamps: true }
);

const Schema_CaseNews_list = new Schema(
  {
    parent: { type: String },
    title: { type: String },
    date: { type: Date, default: new Date() },
    data:{type:"Mixed"} /* {
      text: [String],
      pic: [String]
    } */
  },
  { timestamps: true }
);
//about

const Schema_About = new Schema({
  title: String,
  content: [
    new Schema({
      webSite: String,
      body: String
    })
  ]
});
const Schema_Head = new Schema(
  {
    title: { type: String },
    data:{type:"Mixed"} /*  {
      title: { type: String },
      keywords: { type: String },
      description: { type: String }
    } */
  },
  { timestamps: true }
);

const Schema_Page = new Schema(
  {
    parent: { type: String },
    title: { type: String },
    table: { type: String },
    data: ["Mixed"]
  },
  { timestamps: true }
);
const Schema_Router = new Schema(
  {
    rout: { type: String },
    title: String
  },
  { timestamps: true }
);

const SaveRouter = async ({ title, rout }:{title:string,rout:string}) => {
  if (!title) title = rout.split("/").pop() as string;
  let r = await Router.findOne({ rout });
  if (r) return r;
  let route = new Router({ title, rout });
  return await route.save();
};

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
const Head = mongoose.model("Head", Schema_Head);
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
  Head,
  Page,
  Router,
  SaveRouter,
  
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

  
};