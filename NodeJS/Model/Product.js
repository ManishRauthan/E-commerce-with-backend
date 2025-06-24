import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  brand: String,
  thumbnail: String,
  rating: Number,
  shippingInformation: String,
  warrantyInformation: String,
});

export default mongoose.model("Product", productSchema);
