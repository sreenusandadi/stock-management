import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";

const router = Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

export default router;
