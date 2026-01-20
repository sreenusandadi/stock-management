import { Router } from "express";

const router = Router();

import {
  signUp,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller";

router.get("/refresh", refreshToken);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
