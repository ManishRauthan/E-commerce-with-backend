import useFetchProducts from "../Utils/useFetchProducts";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import SearchInput from "./SearchInput";

function ProductList() {
  const { products, loading } = useFetchProducts();

  const searchQuery = useSelector((state) => state.search.query.toLowerCase());

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="flex justify-center bg-gray-100 ">
        <img
          src="Images\online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
          className="w-400 mt-2 mb-15 rounded-3xl"
        ></img>
      </div>

      <div className="bg-gray-100">
        <h2 className="text-4xl ml-25 font-bold">🛒 Product List</h2>

        <div className="flex justify-center my-6">
          <SearchInput />
        </div>

        {/* Product Items */}
        <div className="flex flex-wrap justify-center mx-auto m-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} details={product} />
            ))
          ) : (
            <p className="text-xl text-gray-700">No products found 😕</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
