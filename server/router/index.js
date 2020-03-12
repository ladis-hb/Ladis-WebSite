/* jshint esversion:8 */
const Router = require("koa-router");
const Admin = require("./admin");
const Auth = require("./auth");
const Upload = require("./upload");
const Edit = require("./edit");
const Docment = require("./Docment")

const router = new Router();


router.get("/administrator/:id", Admin);
router.post("/api/auth/:id", Auth);
router.get("/api/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/edit/:id", Edit);
router.get("/api/:id", Docment);

module.exports = router;
