import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

// Her istekte token varsa otomatik ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = (data) => api.post("/auth/register", data)
export const loginUser = (data) => api.post("/auth/login", data)
export const getMe = () => api.get("/auth/me")