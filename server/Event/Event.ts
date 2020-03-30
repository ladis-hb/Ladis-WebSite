import { EventEmitter } from "events";
import { cases } from "typing";
import DB from "../mongoose/content";
import { DefaultContext } from "koa";
type eventsName = "refreshNews" | "refreshCases";
export class Query {
  // 公共缓存
  public NewsMap: Map<string, cases>;
  public CasesMap: Map<string, cases>;
  public NewsLinkArray: string[];
  public CasesLinkArray: string[];
  private Event: EventEmitter;
  constructor() {
    this.NewsMap = new Map();
    this.CasesMap = new Map();
    this.NewsLinkArray = [];
    this.CasesLinkArray = [];
    this.Event = new EventEmitter();
    this.start();
  }
  // 注册监听，加载初始缓存
  private start() {
    this.loadNews();
    this.loadCase();
    this.Event.on("refreshNews", this.loadNews).on("refreshCases", this.loadCase);
  }
  // 挂载监听到koa ctx
  public attach(app: DefaultContext) {
    app.context.$Event = this;
  }
  // 暴露事件触发器，不做条件判断，不接受参数
  public emit(events: eventsName) {
    this.Event.emit(events);
  }
  // 加载案例缓存
  private async loadCase() {
    const tempCase: Set<string> = new Set();
    const Cases: cases[] = await DB.Case.find()
      .sort({ "data.time": -1 })
      .lean();
    Cases.forEach(el => {
      tempCase.add(el.link);
      this.CasesMap.set(el.link, el);
    });
    this.CasesLinkArray = Array.from(tempCase);
    console.log(`缓存案例，条目${this.CasesMap.size}`);
  }
  // 加载新闻缓存
  private async loadNews() {
    const tempNews: Set<string> = new Set();
    const News: cases[] = await DB.News.find()
      .sort({ "data.time": -1 })
      .lean();
    News.forEach(el => {
      tempNews.add(el.link);
      this.NewsMap.set(el.link, el);
    });
    this.NewsLinkArray = Array.from(tempNews);
    console.log(`缓存新闻，条目${this.NewsMap.size}`);
  }
}

export default new Query();
