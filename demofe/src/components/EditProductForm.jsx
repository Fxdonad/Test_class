import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProductById, updateProduct } from "../api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

const EditProductForm = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      setValue("categoryId", response.data.category.id);
      setValue("name", response.data.name);
      setValue("description", response.data.description);
    };

    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    await updateProduct(id, {
      name: data.name,
      description: data.description,
      category: { id: data.categoryId },
    });
    alert("Product updated successfully!");
    navigate("/products");
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
          <div className="flex items-center justify-center min-h-screen">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-1/3 p-8 space-y-6 bg-white rounded-lg shadow-lg"
            >
              <h1 className="mb-6 text-3xl font-bold text-center">
                Edit Product
              </h1>
              <div>
                <label className="block font-medium">Category ID</label>
                <input
                  type="number"
                  {...register("categoryId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className={`w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                />
                {errors.categoryId && (
                  <span className="text-red-500">
                    This field is required and should be a number.
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required.</span>
                )}
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  className={`w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                />
                {errors.description && (
                  <span className="text-red-500">This field is required.</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition-transform transform bg-blue-300 rounded-lg hover:scale-105 active:scale-95"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProductForm;
