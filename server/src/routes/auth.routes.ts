import { Router } from "express";

const router = Router();

import { signUp, login, logout } from "../controllers/auth.controller";

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
