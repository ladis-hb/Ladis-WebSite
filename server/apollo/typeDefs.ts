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
  #Query
  type Query {
    # upload文件列表
    getUploadFiles(filter:String):pic
    # 获取代理商列表
    getAgents:[Agent]
    # 获取代理商about信息
    getAbouts(selectType:String,webSite:String):String
    
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
    setCaseNews(type:String,arg:JSON):result
  }
`;

export default typeDefs;
