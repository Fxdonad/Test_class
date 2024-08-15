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
        <SideBar/>
        <div className="flex-1 m-6">
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
                className="flex items-center px-4 py-2 text-black transition-transform transform bg-green-300 rounded-lg hover:scale-105 active:scale-95"
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
                              className="flex items-center px-4 py-2 text-black transition-transform transform bg-blue-300 rounded-lg hover:scale-105 active:scale-95"
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
                              className="flex items-center px-4 py-2 text-black transition-transform transform bg-red-300 rounded-lg hover:scale-105 active:scale-95"
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
                      <td colSpan="5" className="h-12 py-4 text-center">
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
