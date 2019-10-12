/* jshint esversion:8 */
const Mongolass = require("mongolass");
const mongolass = new Mongolass("mongodb://localhost:27017/ladis");

const supportModel = mongolass.model("support", {
  parent: { type: Mongolass.Types.String },
  title: { type: Mongolass.Types.String },
  date: { type: Mongolass.Types.Date, default: new Date() },
  table: { type: Mongolass.Types.String, default: "support" },
  data: [{ type: { type: "string" } }]
});

module.exports = { supportModel };
