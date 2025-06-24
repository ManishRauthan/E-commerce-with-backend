import { useDispatch } from "react-redux";
import { setSearchQuery } from "../Utils/SearchSlice";

function SearchInput() {
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={handleChange}
      className="p-2 border rounded w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  );
}

export default SearchInput;
