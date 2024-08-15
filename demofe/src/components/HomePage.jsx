import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-8 text-6xl font-extrabold text-black">
        Welcome to Product Manager
      </h1>
      <p className="mb-8 text-2xl text-center text-black">
        Manage your products efficiently with our intuitive interface.
      </p>
      <div className="space-x-4">
        <Link to="/products">
          <button className="px-6 py-3 font-semibold text-white transition-transform transform bg-blue-300 rounded-lg shadow-lg hover:scale-105 active:scale-95">
            View Products
          </button>
        </Link>
        <Link to="/new-product">
          <button className="px-6 py-3 font-semibold text-white transition-transform transform bg-green-300 rounded-lg shadow-lg hover:scale-105 active:scale-95">
            Add New Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
