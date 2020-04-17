import { DocumentNode } from "graphql";
import { gql } from "apollo-server-koa";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";

const typeDefs: DocumentNode = gql`
  scalar Date
  scalar JSON
  scalar JSONObject
  # 通用Mutate返回
  type result {
    msg: String
    ok: Int
    n: Int
    nModified: Int
    upserted:JSON
  }
  
  # 用户
  type User {
    name: String
    user: String
    userGroup: String
    mail: String
    company: String
    tel: Int
    creatTime: Date
    modifyTime: Date
    address: String
    status: Boolean
    messageId: String
  }
  # 
  type pic {
    files: [String]
    size: Int
    msg: String
  }
  # 
  type Agent {
    name: String
    url: String
  }
  #buy
  type buys {
    MainParent:String
    date: String
    parentsUntil: String
    parent: String
    title: String
    link:String
    content: String
  }
  #cases
  type case {
    MainTitle: String
    img:String
    date: String
    text: String
    link: String
  }
  # caselist
  type caseList {
    PageTitle: String
    Pagekeywords: String
    Pagedescription: String
    text: [String]
    pic: [String]
    content: String
    link: String
  }
  # 软件下载
  type supportDown {
    PageTitle: String
    Pagekeywords: String
    Pagedescription: String
    MainUrl: String
    MainTitle: String
    MainParent: String
    date: String
    href: String
    link: String
    language: String
    type: String
    title: String
    platform: String
    size: String
    version: String
    updateReason: String
    down: String
  }
  type supportProblem {
    PageTitle: String
    Pagekeywords: String
    Pagedescription: String
    MainUrl: String
    MainTitle: String
    MainParent: String
    date: String
    table: String
    href: String
    title: String
    link: String
    movie: String
    html: String
    parentsUntil: String
    parent: String
    data: String
  }
  # 产品
  type product {
    PageTitle: String
    Pagekeywords: String
    Pagedescription: String
    MainUrl: String
    MainTitle: String
    MainParent: String
    date: String
    table: String
    href: String
    title: String
    img: String
    link: String
  }
  type productList {
    PageTitle: String
    Pagekeywords: String
    Pagedescription: String
    MainUrl: String
    MainTitle: String
    MainParent: String
    date: String
    table: String
    href: String
    title: String
    link: String
    head: String
    body: String
    img: [String]
  }
  #Query
  type Query {
    # upload文件列表
    getUploadFiles(filter:String):pic
    # 获取代理商列表
    getAgents:[Agent]
    # 获取代理商about信息
    getAbouts(selectType:String,webSite:String):String
    # 获取经销商列表
    getbuys:[buys]
    #
    getbuy(title:String):buys
    #获取案例列表
    getCases:[case]
    # 获取案例single
    getCase(title:String):case
    # 
    getCaseList(title:String):caseList
    #获取新闻列表
    getNews:[case]
    # 获取案例single
    getNew(title:String):case
    # 
    getNewList(title:String):caseList
    # 获取软件下载列表
    getSofts:[supportDown]
    #
    getSoft(title:String):supportDown
    # 获取常见问题列表
    getProblems:[supportProblem]
    getProblem(title:String):supportProblem
    # 获取产品列表
    getProducts:[product]
    getProduct(title:String):product

    getProductList(title:String):productList
    
  }

  #mutation
  type Mutation {
    #admin
    # 注册用户
    register(user:String,passwd:String,mail:String):result
    # 配置轮播图
    setCarousel(Path:[String]):result
    # 配置产品
    setProduct(arg:JSON):result
    # 常见问题配置
    setProblem(arg:JSON):result
    # 配置下载软件
    setSoft(arg:JSON):result
    # 配置经销商
    setBuy(arg:JSON):result
    # 配置案例 新闻资讯
    setCaseNews(arg:JSON):result
    # 配置about
    setAbout(arg:JSON):result
    #
    delBuy(title:String):result
    #
    delCase(title:String):result
    #
    delNew(title:String):result
    #
    delSupportSoft(title:String):result
    #
    delSupportProblem(title:String):result
    #
    delProduct(title:String):result
  }
`;

export default typeDefs;
