import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-6xl font-extrabold text-gray-800">404</h1>
      <p className="mb-8 text-2xl text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <button className="px-6 py-3 font-semibold text-white transition-transform transform bg-blue-500 rounded-lg shadow-lg hover:scale-105 active:scale-95">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
