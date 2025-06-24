import Cart from "../Model/Cart.js";

export const addToCart = async (req, res) => {
  console.log("📥 Incoming cart item:", req.body);
  try {
    const { productId, quantity } = req.body;

    const newItem = new Cart({ productId, quantity });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    console.error("❌ Error saving to DB:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const getCartItemById = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart item" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted", item });
  } catch (err) {
    console.error("❌ Delete failed:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const deleteCartItemByProductId = async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({
      productId: req.params.productId,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", err });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    console.log("🧹 All items cleared from cart");
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("❌ Error clearing cart", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Quantity updated", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
