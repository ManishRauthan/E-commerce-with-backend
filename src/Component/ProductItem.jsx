import { Link } from "react-router-dom";
import { addItem } from "../Utils/CartSlice";
import { useDispatch } from "react-redux";

function ProductItem(props) {
  const dispatch = useDispatch();

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
      <div className="m-5 rounded-2xl  transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
        <Link
          to={
            `productdetail/${props.details._id}` ||
            `/category/:category/${props.details.id}`
          }
        >
          <div className="p-4 rounded-t-2xl bg-white h-auto flex flex-col items-center gap-4 ">
            {/* Product Image */}
            <img
              src={props.details.images?.[0] || props.details.thumbnail}
              className="w-48 h-48  rounded-xl transition-transform duration-300 hover:scale-105"
            />

            {/* Product Info */}
            <div className="text-center space-y-2">
              <h1 className="text-xl font-semibold">{props.details.title}</h1>

              {/* Rating */}
              <div className="text-yellow-400 text-xl">
                {"★".repeat(Math.round(props.details.rating || 0))}
              </div>

              {/* Price */}
              <p className="text-lg font-bold text-gray-800">
                ${props.details.price}
              </p>
            </div>
          </div>
        </Link>
        <div className="p-4 rounded-b-2xl bg-white h-auto flex flex-col items-center gap-4 ">
          <div className="text-center space-y-2">
            {/* Optional Info */}

            <p className="text-sm text-gray-600">
              {props.details.shippingInformation}
            </p>

            <p className="text-sm text-gray-600">
              {props.details.warrantyInformation}
            </p>

            {/* Add to Cart Button */}
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-full transition duration-200 shadow-md mt-2 cursor-pointer"
              onClick={() => handleAddItem(props.details)}
            >
              Add to cart 🛒
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
