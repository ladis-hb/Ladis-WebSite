/* jshint esversion:8 */
const Client = require("mongodb").MongoClient;
function db(dbs) {
  let c = Client.connect("mongodb://localhost:27017", {
    useNewUrlParser: true
  });
  return c.then(db => {
    return db.db(dbs);
  });
}

module.exports = db;
