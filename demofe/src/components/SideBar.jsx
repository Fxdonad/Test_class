import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    if (
      location.pathname === path ||
      (location.pathname.startsWith("/edit-product") && path === "/products")
    ) {
      if (path === "/products") {
        return "bg-blue-300 text-black";
      } else if (path === "/new-product") {
        return "bg-green-300 text-black";
      } else {
        return "bg-gray-700 text-white";
      }
    } else {
      return "bg-gray-800 text-white hover:bg-gray-700";
    }
  };

  return (
    <aside className="h-auto p-4 text-white bg-gray-800 opacity-90">
      <nav className="space-y-2">
        <Link to="/" className={`block px-4 py-2 rounded ${getLinkClass("/")}`}>
          Home
        </Link>
        <Link
          to="/products"
          className={`block px-4 py-2 rounded ${getLinkClass("/products")}`}
        >
          Product List
        </Link>
        <Link
          to="/new-product"
          className={`block px-4 py-2 rounded ${getLinkClass("/new-product")}`}
        >
          Create Product
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
