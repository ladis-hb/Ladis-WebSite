/* jshint esversion:8 */
const Client = require("mongodb").MongoClient;

class Mongo {
  constructor(url, db, collection) {
    this.url = url || "mongodb://localhost:27017";
    this.db = db;
    this.collection = collection;
  }

  /**
   *
   *
   * @returns 返回db的promise
   * @memberof Mongo
   */
  DB() {
    return new Promise((res, rej) => {
      Client.connect(this.url, { useNewUrlParser: true }, (err, db) => {
        if (err) rej(err);
        res(db.db(this.db).collection(this.collection));
      });
    });
  }
  /**
   *
   *
   * @param {*} query 可选，使用查询操作符指定查询条件
   * @returns 以格式化的方式来显示第一条文档
   * @memberof Mongo
   */
  async findOne(query) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.findOne(query, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }
  /**
   *
   *
   * @param {*} query 可选，使用查询操作符指定查询条件
   * @returns 以格式化的方式来显示所有文档
   * @memberof Mongo
   */
  async find(query) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.find(query).toArray((err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   *
   * @param {*} query 可选，使用查询操作符指定查询条件
   * @param {*} sortobj  sortobj:{key:1 or -1}key是排序字节
   * @param {*} limit  条目数
   * @returns
   * @memberof Mongo
   */
  async findlimit(query, sortobj, limit) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.find(query)
        .sort(sortobj)
        .limit(limit)
        .toArray((err, result) => {
          if (err) rej(err);
          res(result);
        });
    });
  }

  /**
   *
   *
   * @param {*} query 单条数据，json
   * @returns
   * @memberof Mongo
   */
  async insert(query) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.insertOne(query, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   *
   * @param {*} queryArray 多条数据，Array
   * @returns
   * @memberof Mongo
   */
  async insertArray(queryArray) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.insertMany(queryArray, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   * 更新匹配到的第一天数据
   * @param {*} query update对象update的查询条件，类似sql update查询内where后面的。
   * @param update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
   * @returns
   * @memberof Mongo
   */
  async updateOne(query, update) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.updateOne(query, update, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   * 更新匹配到的all数据
   * @param {*} query update对象update的查询条件，类似sql update查询内where后面的。
   * @param update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
   * @returns
   * @memberof Mongo
   */
  async updateMary(query, update) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.updateMary(query, update, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   *
   * @param {*} query 删除的文档的条件。
   * remove({'title':'MongoDB 教程'})
   * @returns
   * @memberof Mongo
   */
  async delete(query) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.deleteOne(query, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  /**
   *
   *
   * @param {*} query 删除的文档的条件。
   * 提供了_id，同id替换旧的内容
   * @returns
   * @memberof Mongo
   */
  async save(query) {
    var db = await this.DB();
    return new Promise((res, rej) => {
      db.save(query, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }
}

module.exports = Mongo;
