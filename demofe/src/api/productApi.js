import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/products";

export const getProducts = (page = 0, size = 10) => {
  return axios.get(API_BASE_URL, {
    params: {
      page: page,
      size: size,
    },
  });
};

export const getProductById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const createProduct = (product) => {
  return axios.post(API_BASE_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_BASE_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const searchProductsByName = (name) => {
  return axios.get(`${API_BASE_URL}/search`, { params: { name } });
};

export const filterProductsByCategory = (categoryId) => {
  return axios.get(`${API_BASE_URL}/filter`, { params: { categoryId } });
};
