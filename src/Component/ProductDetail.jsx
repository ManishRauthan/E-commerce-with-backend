import { useParams } from "react-router-dom";
import useFetchProducts from "../Utils/useFetchProducts";
import Review from "./Review";
import { addItem } from "../Utils/CartSlice";
import { useDispatch } from "react-redux";

function ProductDetail() {
  const param = useParams();
  const { products, loading } = useFetchProducts();

  const dispatch = useDispatch();

  // ✅ Use _id if data is from MongoDB
  const product = products.find((e) => String(e._id) === String(param.id));

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  function handleAddItem(item) {
    dispatch(addItem(item));
    console.log("Adding item to backend:", item);

    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: item._id,
        quantity: 1,
      }),
    }).catch((err) => console.error("❌ Add to cart failed", err));
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 m-10">
        <div className="flex md:flex-row gap-8">
          <div className="flex-1">
            <img
              src={product.images?.[0] || product.thumbnail || "/fallback.jpg"}
              alt={product.title}
              className="rounded-lg w-full max-w-md mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex-2 space-y-4">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-700">Brand:</span>{" "}
                {product.brand}
              </p>
              <p>
                <span className="font-medium text-gray-700">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            <div className="text-3xl font-bold text-red-600">
              ${product.price}
            </div>

            <p className="text-xl font-medium">
              ⭐<span className="pl-2">{product.rating || 0} / 5</span>
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Stock:</span>{" "}
              {product.stock > 0 ? product.stock : "Out of stock"}
            </p>

            <button
              className="mt-4 bg-yellow-300 hover:bg-yellow-500 py-2 px-4 font-medium rounded-full cursor-pointer"
              onClick={() => handleAddItem(product)}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="text-3xl font-semibold pb-10 pl-6">
          <h1>Top Reviews</h1>
        </div>
        <div className="flex space-x-2 pl-12 pb-10">
          {product.reviews?.map((review, index) => (
            <Review key={index} details={review} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
