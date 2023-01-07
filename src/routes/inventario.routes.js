import { Router } from "express";

import { ColorTable, ColorAdd, ColorAddPost, ColorEdit, ColorEditPost, ColorDelete } from "../controllers/inventario/color.controller.js";
import { Listado, NotaIngreso, NotaSalida } from "../controllers/inventario/inventario.controller.js";
import { ProvAdd, ProvAddPost, ProvDelete, ProvEdit, ProvEditPost, ProvTable } from "../controllers/inventario/proveedor.controller.js";
import { TallaDelete, TallaAddPost,TallaAdd, TallaTable, TallaEdit, TallaEditPost } from "../controllers/inventario/talla.controller.js";
import { consultaDepartamentos, consultaDistritos, consultaProvincias } from "../controllers/tools.controller.js";
import { UnitAddPost, UnitAdd, UnitTable, UnitDelete, UnitEdit, UnitEditPost } from "../controllers/inventario/unit.controller.js";

import { isAuthenticated } from "../helpers/auth.js";


const router = Router();

//HERRAMIENTAS
router.get("/api/consulta-departamentos", isAuthenticated ,consultaDepartamentos)
router.get("/api/consulta-provincias/:departamento", isAuthenticated , consultaProvincias)
router.get("/api/consulta-distritos/:departamento/:provincia", isAuthenticated , consultaDistritos)

router.get("/inventario/listado", isAuthenticated , Listado)
router.get("/inventario/nota-ingreso", isAuthenticated, NotaIngreso)
router.get("/inventario/nota-salida", isAuthenticated, NotaSalida)

// ROUTES PROVEEDORES
router.get("/inventario/proveedor", isAuthenticated, ProvTable)
router.get("/inventario/proveedor/add", isAuthenticated, ProvAdd)
router.post("/inventario/proveedor/add", isAuthenticated, ProvAddPost)
router.get("/inventario/proveedor/:id/edit", isAuthenticated, ProvEdit)
router.post("/inventario/proveedor/:id/edit", isAuthenticated, ProvEditPost)
router.get("/inventario/proveedor/:id/delete", isAuthenticated, ProvDelete)


// ROUTES COLOR
router.get("/inventario/color", isAuthenticated, ColorTable)
router.get("/inventario/color/:id/edit", isAuthenticated, ColorEdit)
router.post("/inventario/color/:id/edit", isAuthenticated, ColorEditPost)
router.get("/inventario/color/add", isAuthenticated, ColorAdd)
router.post("/inventario/color/add", isAuthenticated, ColorAddPost)
router.get("/inventario/color/:id/delete", isAuthenticated, ColorDelete)

// ROUTES TALLA
router.get("/inventario/talla", isAuthenticated, TallaTable)
router.get("/inventario/talla/add", isAuthenticated, TallaAdd)
router.post("/inventario/talla/add", isAuthenticated, TallaAddPost)
router.get("/inventario/talla/:id/delete", isAuthenticated, TallaDelete)
router.get("/inventario/talla/:id/edit", isAuthenticated, TallaEdit)
router.post("/inventario/talla/:id/edit", isAuthenticated, TallaEditPost)

// ROUTES UNIDAD DE MEDIDA
router.get("/inventario/unidad-medida", isAuthenticated, UnitTable)
router.get("/inventario/unidad-medida/add", isAuthenticated, UnitAdd)
router.post("/inventario/unidad-medida/add", isAuthenticated, UnitAddPost)
router.get("/inventario/unidad-medida/:id/edit", isAuthenticated, UnitEdit)
router.post("/inventario/unidad-medida/:id/edit", isAuthenticated, UnitEditPost)
router.get("/inventario/unidad-medida/:id/delete", isAuthenticated, UnitDelete)

export default router;
