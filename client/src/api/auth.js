import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:5050/api" : "/api")
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function loginRequest(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function registerRequest(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function getSecretMessage() {
  const response = await api.get("/private/overview");
  return response.data;
}

export default api;
