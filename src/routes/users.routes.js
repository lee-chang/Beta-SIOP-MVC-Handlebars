import { Router } from "express";
import { renderLogout, renderSignIn, renderSignInPost, renderSignUp, renderSignUpPost } from "../controllers/users.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/users/signup", renderSignUp);
router.get("/users/signin", renderSignIn);

router.post("/users/signup", renderSignUpPost);
router.post("/users/signin", renderSignInPost);
router.get("/users/logout", isAuthenticated ,renderLogout);

export default router;