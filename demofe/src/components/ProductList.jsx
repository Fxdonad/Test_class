import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleNewProduct = () => {
    navigate("/new-product");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterProducts(value, filterTerm);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterTerm(value);
    filterProducts(searchTerm, value);
  };

  const filterProducts = (searchTerm, filterTerm) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filterTerm) {
      filtered = filtered.filter(
        (product) => product.category.id.toString() === filterTerm
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mt-8 mb-10 text-5xl font-extrabold text-center text-gray-800">
        Product Management
      </h1>
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Search products</span>
          <input
            type="text"
            placeholder="Search products"
            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Filter products</span>
          <input
            type="number"
            placeholder="Filter by Category ID"
            className="px-4 py-2 border border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={filterTerm}
            onChange={handleFilter}
          />
        </div>
        <button
          className="flex items-center px-4 py-2 text-white transition-transform transform bg-green-300 rounded-lg hover:scale-105 active:scale-95"
          onClick={handleNewProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Create new product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-gray-700 border">ID</th>
              <th className="px-4 py-2 text-gray-700 border">Category ID</th>
              <th className="px-4 py-2 text-gray-700 border">Name</th>
              <th className="px-4 py-2 text-gray-700 border">Description</th>
              <th className="px-4 py-2 text-center text-gray-700 border">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 text-center border">{product.id}</td>
                  <td className="px-4 py-2 text-center border">
                    {product.category.id}
                  </td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="px-4 py-2 text-center border">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="flex items-center px-4 py-2 text-white transition-transform transform bg-blue-300 rounded-lg hover:scale-105 active:scale-95"
                        onClick={() => handleEdit(product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-white transition-transform transform bg-red-300 rounded-lg hover:scale-105 active:scale-95"
                        onClick={() => handleDelete(product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
