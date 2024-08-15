import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    if (
      location.pathname === path ||
      (location.pathname.startsWith("/edit-product") && path === "/products")
    ) {
      if (path === "/products") {
        return "text-blue-300";
      } else if (path === "/new-product") {
        return "text-green-300";
      } else {
        return "text-white";
      }
    } else {
      return "text-white hover:text-gray-300";
    }
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Product Management</h1>
        <nav>
          <Link to="/" className={`mx-2 ${getLinkClass("/")}`}>
            Home
          </Link>
          <Link to="/products" className={`mx-2 ${getLinkClass("/products")}`}>
            Product List
          </Link>
          <Link
            to="/new-product"
            className={`mx-2 ${getLinkClass("/new-product")}`}
          >
            Create Product
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
