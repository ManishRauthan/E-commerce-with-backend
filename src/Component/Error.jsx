import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

// This section to show error

function Error() {
  const error = useRouteError();
  console.log("error:", error);
  return (
    <>
      <div className="h-screen bg-blue-100 text-4xl  font-medium flex flex-col justify-center items-center ">
        <h1 className=" p-4"> Page Not Found : {error.status}</h1>
        <h2 className=" p-4 mb-10">{error.data}</h2>
        <Link to="/">
          <button className=" bg-amber-200 border h-20 w-35 rounded-2xl font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white">
            Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default Error;
