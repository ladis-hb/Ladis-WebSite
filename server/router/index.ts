/* jshint esversion:8 */
import Router from "koa-router";
import Admin from "./admin";
import Auth from "./auth";
import Upload from "./upload";
import Edit from "./edit";
import Docment from "./Docment";

const router = new Router();
router.get("/administrator/:id", Admin);
router.post("/auth/:id", Auth);
router.put("/uploads/:id", Upload);
router.get("/edit/:id", Edit);
router.get("/api/:id", Docment);

export default router;
