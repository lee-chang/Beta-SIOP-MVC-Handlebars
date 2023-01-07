import { Router } from "express";
import { renderDashboard, renderIndex } from "../controllers/index.controller.js";
import { isAuthenticated } from "../helpers/auth.js";


const router = Router();


router.get("/", renderIndex);
router.get("/escritorio", isAuthenticated, renderDashboard);


export default router;
