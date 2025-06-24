import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const navigate = useNavigate();

  function clicked(e) {
    const buttonclicked = e.target.textContent;
    navigate(`/category/${buttonclicked}`);
  }
  return (
    <>
      <div className="flex justify-center items-center text-sm font-sans border bg-[#232f3e] text-gray-300 border-black/20 h-15">
        <ul className="flex space-x-15 cursor-pointer">
          {["BEAUTY", "FRAGRANCES", "FURNITURE", "GROCERIES"].map((item) => (
            <li
              onClick={clicked}
              className="hover:scale-110 hover:text-white hover:font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Nav;
