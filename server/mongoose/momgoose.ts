import mongoose from "mongoose";
const DB_URL = `mongodb://${process.env.NODE_Docker === 'docker' ? 'mongo' : 'localhost'}:27017/ladis`; /** * 连接 */
export const Schema = mongoose.Schema;

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}); /** * 连接成功 */
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.connection.on("connected", function () {
  console.log("Mongoose connection open to " + DB_URL);
}); /** * 连接异常 */

mongoose.connection.on("error", function (err: string) {
  console.log("Mongoose connection error: " + err);
}); /** * 连接断开 */

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});
export const mongooses = mongoose
