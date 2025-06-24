import { useParams } from "react-router-dom";
import useFetchProducts from "../Utils/useFetchProducts";
import ProductItem from "./ProductItem";

function Category() {
  const { products, loading } = useFetchProducts();
  const param = useParams();

  const product = products.filter(
    (e) => e.category.toLowerCase() === param.category.toLowerCase()
  );
  // console.log(product);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div>
          <h1 className="font-bold text-5xl text-gray-700  mt-20 ml-40 ">
            {param.category} PRODUCTS -
          </h1>
        </div>
        <div className="flex flex-wrap justify-center mx-auto m-10 mt-20">
          {product.map((product) => (
            <ProductItem details={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
