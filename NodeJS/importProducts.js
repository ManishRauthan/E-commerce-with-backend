import mongoose from "mongoose";
import Product from "./Model/Product.js";

mongoose.connect("mongodb://localhost:27017/shoppyglobe");

const importData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const formatted = data.products.map((item) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      category: item.category,
      brand: item.brand,
      thumbnail: item.thumbnail,
      rating: item.rating ?? 4.5,
      shippingInformation:
        item.shippingInformation ?? "Free shipping available",
      warrantyInformation:
        item.warrantyInformation ?? "1 year warranty included",
    }));

    await Product.insertMany(formatted);
    console.log("✅ Products inserted successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error importing products", error);
  }
};

importData();
