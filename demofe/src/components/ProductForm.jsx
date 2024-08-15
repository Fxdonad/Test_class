import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api/productApi";

const ProductForm = ({ selectedProduct, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: { id: "" },
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct({ name: "", description: "", category: { id: "" } });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.id) {
      await updateProduct(product.id, product);
    } else {
      await createProduct(product);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block">Description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block">Category ID</label>
        <input
          type="number"
          name="category.id"
          value={product.category.id}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
