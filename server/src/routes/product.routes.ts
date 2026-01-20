import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/products", authMiddleware, getAllProducts);

router.get("/products/:id", authMiddleware, getProductById);

router.post("/products", authMiddleware, createProduct);

router.put("/products/:id", authMiddleware, updateProduct);

router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
