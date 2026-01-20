import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authMiddleware, isAdmin, getUsers);

export default router;
