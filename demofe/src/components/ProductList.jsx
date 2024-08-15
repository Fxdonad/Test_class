import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/productApi";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const navigate = useNavigate();
  const pageSize = 10; // Số sản phẩm trên mỗi trang

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage]);

  const fetchProducts = async (page, size) => {
    try {
      const response = await getProducts(page, size);
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
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
        fetchProducts(currentPage, pageSize); // Cập nhật lại danh sách sau khi xóa
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
    // Tạm thời, filter trên danh sách hiện tại
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

    setProducts(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          <h1 className="mt-8 mb-10 text-5xl font-extrabold text-center text-gray-800">
            Product Management
          </h1>
          <div className="mx-4 mb-6 lg:mx-12">
            <div className="flex justify-between mb-6">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">
                    Search products
                  </span>
                  <input
                    type="text"
                    placeholder="Search products"
                    className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">
                    Filter products
                  </span>
                  <input
                    type="number"
                    placeholder="Filter by Category ID"
                    className="px-4 py-2 border border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={filterTerm}
                    onChange={handleFilter}
                  />
                </div>
              </div>
              <button
                className="flex items-center px-4 py-2 text-white transition-transform transform bg-green-300 rounded-lg hover:scale-105 active:scale-95"
                onClick={handleNewProduct}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create new product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border table-fixed">
                <thead>
                  <tr>
                    <th className="w-1/12 px-4 py-2 text-center text-gray-700 border">
                      ID
                    </th>
                    <th className="w-2/12 px-4 py-2 text-gray-700 border">
                      Category ID
                    </th>
                    <th className="w-4/12 px-4 py-2 text-gray-700 border">
                      Name
                    </th>
                    <th className="w-4/12 px-4 py-2 text-gray-700 border">
                      Description
                    </th>
                    <th className="w-2/12 px-4 py-2 text-center text-gray-700 border">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="h-12">
                        <td className="px-4 py-2 text-center border">
                          {product.id}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {product.category.id}
                        </td>
                        <td className="px-4 py-2 border">{product.name}</td>
                        <td className="px-4 py-2 border">
                          {product.description}
                        </td>
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
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.232 5.232l3.536 3.536M9 11l-4 4m0 0l4 4m-4-4h16"
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
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 13h6m-6 4h6m2 4H7m4-4v-4m1-4h3m2-2.5L12 4 7 8.5m4-4v8m0 4v4m-1 4h2v2m-4-2h2"
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
                      <td colSpan="5" className="py-4 text-center h-12">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`mx-1 px-4 py-2 ${
                      index === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    } rounded-lg`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
