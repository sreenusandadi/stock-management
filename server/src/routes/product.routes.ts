import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/products", authMiddleware, getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

router.put("/products", updateProduct);

export default router;
