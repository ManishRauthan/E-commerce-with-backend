import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const cartItems = useSelector((store) => store.cart.items);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData && userData !== "undefined") {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser.name);
      }
    } catch (err) {
      console.error("Failed to parse user data:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername("");
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between text-xl font-medium border bg-[#131921] text-white border-black/20 h-20">
        <ul className="flex items-center space-x-15 ml-10 cursor-pointer">
          <Link to="/">
            <li className="hover:scale-125">Home</li>
          </Link>
        </ul>

        <div>
          <img
            src="Images/3-removebg-preview.png"
            alt="Logo"
            className="h-20 w-80"
          />
        </div>

        <div className="flex items-center m-10 space-x-8">
          {username ? (
            <>
              <span className="text-green-400">👋 {username}</span>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <p className="cursor-pointer hover:underline">LogIn</p>
            </Link>
          )}

          <Link to="/cart">
            <p>🛒 Cart - {cartItems.length}</p>
          </Link>
        </div>
      </div>
      <Nav />
    </>
  );
}

export default Header;
