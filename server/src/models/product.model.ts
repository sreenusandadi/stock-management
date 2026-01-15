import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  sales: { type: Number, required: true },
  isFavorite: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
