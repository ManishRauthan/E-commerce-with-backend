import express from "express";
import {
  addToCart,
  getAllCartItems,
  getCartItemById,
  deleteCartItem,
  updateCartItemQuantity,
  deleteCartItemByProductId,
  clearCart,
} from "../Controller/cartController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getAllCartItems);
router.get("/:id", getCartItemById);
router.put("/update-quantity/:productId", updateCartItemQuantity);
router.delete("/:id", deleteCartItem);
router.delete("/product/:productId", deleteCartItemByProductId);
router.delete("/", clearCart);

export default router;
