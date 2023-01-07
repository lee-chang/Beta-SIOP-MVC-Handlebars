import { Router } from "express";
import { CategoryHiloAdd, CategoryHiloAddPost, CategoryHiloDelete, CategoryHiloEdit, CategoryHiloEditPost, CategoryHiloTable, HiloAdd, HiloAddPost, HiloDelete, HiloEdit, HiloEditPost, HiloTable } from "../controllers/material/hilo.controller.js";

import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

//CATEGORIA HILO
router.get("/material/hilo/categoria", isAuthenticated, CategoryHiloTable )
router.get("/material/hilo/categoria/add", isAuthenticated, CategoryHiloAdd)
router.post("/material/hilo/categoria/add", isAuthenticated, CategoryHiloAddPost)
router.get("/material/hilo/categoria/:id/edit", isAuthenticated, CategoryHiloEdit)
router.post("/material/hilo/categoria/:id/edit", isAuthenticated, CategoryHiloEditPost)
router.get("/material/hilo/categoria/:id/delete", isAuthenticated, CategoryHiloDelete)

router.get("/material/hilo", isAuthenticated, HiloTable )
router.get("/material/hilo/add", isAuthenticated, HiloAdd )
router.post("/material/hilo/add", isAuthenticated, HiloAddPost )
router.get("/material/hilo/:id/edit", isAuthenticated, HiloEdit )
router.post("/material/hilo/:id/edit",isAuthenticated, HiloEditPost)
router.get("/material/hilo/:id/delete", isAuthenticated, HiloDelete )


export default router;