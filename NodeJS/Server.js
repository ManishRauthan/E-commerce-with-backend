import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

// ✅ CORS should come first
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shoppyglobe");

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
