import { Router } from "express";
import { renderExample } from "../controllers/reportes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/example-forms", isAuthenticated, renderExample)

export default router;