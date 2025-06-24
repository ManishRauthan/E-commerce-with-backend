import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../Controller/productController.js";

const router = express.Router();

router.get("/", getAllProducts); // /products
router.get("/:id", getProductById); // /products/:id

export default router;
