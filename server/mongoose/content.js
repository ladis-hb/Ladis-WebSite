/* jshint esversion:8 */
const { mongoose, Schema } = require("./momgoose");

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
    data:
      "Mixed" /* {
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
    data: "Mixed"
  },
  { timestamps: true }
);

const Schema_Buy = new Schema(
  {
    title: { type: String },
    data:
      "Mixed" /* {
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
    data:
      "Mixed" /* {
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
    data:
      "Mixed" /* {
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
    data: "Mixed" /* {
      text: [String],
      pic: [String]
    } */
  },
  { timestamps: true }
);
const Schema_About = new Schema({
  title: String,
  webSite:String,
  body: [String]
});
const Schema_Head = new Schema(
  {
    title: { type: String },
    data:
      "Mixed" /*  {
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

const SaveRouter = async ({ title, rout }) => {
  if (!title) title = rout.split("/").pop();
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

module.exports = {
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
  SaveRouter
};
