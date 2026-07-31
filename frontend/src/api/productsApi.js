const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const API_BASE_URL = env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const request = async (path, options = {}) => {
  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Merge existing headers
  const headers = {
    ...(options.headers || {}),
  };

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers,
  });

  // Token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // Other errors
  if (!response.ok) {
    const errorMessage = await response.text().catch(() => "");
    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }

  return response;
};

export const getProducts = async () => {
  const response = await request('/products');
  return response.json();
};

export const getProductById = async (id) => {
  const response = await request(`/product/${id}`);
  return response.json();
};

export const getProductImageUrl = async (id) => {
  const response = await request(`/product/${id}/image`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const searchProducts = async (keyword) => {
  const response = await request(`/product/search?keyword=${encodeURIComponent(keyword)}`);
  return response.json();
};

export const createProduct = async (formData) => {
  const response = await request('/product', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export const updateProduct = async (id, formData) => {
  const response = await request(`/product/${id}`, {
    method: 'PUT',
    body: formData,
  });

  return response.text();
};

export const deleteProduct = async (id) => {
  const response = await request(`/product/${id}`, {
    method: 'DELETE',
  });

  return response.text();
};

export { buildApiUrl };