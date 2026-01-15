"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const getAllProducts = async (req, res) => {
    try {
        const products = await product_model_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    const { name, price, description, stock, isFavorite, sales } = req.body;
    try {
        const newProduct = new product_model_1.default({
            name,
            price,
            description,
            stock,
            isFavorite,
            sales,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProduct = createProduct;
