import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(authMiddleware);

app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(process.env.MONGODB_URI!);
});
