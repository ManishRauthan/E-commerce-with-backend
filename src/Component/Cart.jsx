import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../Utils/CartSlice";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);

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

  function handleRemoveItem(item) {
    dispatch(removeItem(item));

    fetch(`http://localhost:3000/cart/product/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Deleted:", data))
      .catch((err) => console.error("❌ Remove item failed", err));
  }

  function handleClear() {
    dispatch(clearCart());

    fetch("http://localhost:3000/cart", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log("✅", data.message))
      .catch((err) => console.error("❌ Clear cart failed", err));
  }

  return (
    <>
      <div className="min-h-screen ">
        <div className="flex flex-col justify-center mt-10 ml-100 ">
          <div className=" mt-10 ml-200 ">
            <button
              className=" bg-yellow-300 hover:bg-yellow-500  py-2 px-4  font-medium rounded-full"
              onClick={handleClear}
            >
              Clear Cart
            </button>
          </div>
          <div className="text-4xl font-bold ">
            <h1>Shopping Cart</h1>
          </div>
        </div>
        <div></div>

        {cartItems.map((product) => {
          return (
            <>
              <div className="max-w-3xl mx-auto p-6  m-10">
                <div className="flex  md:flex-row gap-8">
                  <div className="flex-1 ">
                    <img
                      src={product.thumbnail}
                      className="rounded-lg w-full max-w-md mx-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex-2 space-y-4 ml-10 ">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>

                    <div className="text-sm text-gray-500"></div>

                    <div className="text-3xl font-bold text-red-600">
                      ${product.price}
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium ">Stock:</span>
                      {product.stock > 0 ? product.stock : "Out of stock"}
                    </p>
                    <p className="text-sm text-gray-700 font-bold">
                      {product.shippingInformation}
                    </p>
                    {/* Adding and removing items from cart */}
                    <div className="flex items-center mt-5">
                      <button
                        className="cursor-pointer bg-amber-200 h-7 w-7 rounded-l-4xl hover:bg-amber-300 hover:scale-110"
                        onClick={() => handleAddItem(product)}
                      >
                        ➕
                      </button>
                      <span className="text-3xl font-medium  ml-2 mr-2">
                        {product.quantity}
                      </span>

                      <button
                        className="cursor-pointer bg-amber-200 h-7 w-7 rounded-r-4xl hover:bg-amber-300 hover:scale-110"
                        onClick={() => handleRemoveItem(product)}
                      >
                        ➖
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Cart;
