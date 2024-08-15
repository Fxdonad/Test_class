import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/new-product" element={<CreateProductForm />} />
      <Route path="/edit-product/:id" element={<EditProductForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
