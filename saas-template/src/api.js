import axios from "axios"

const api = axios.create({
  baseURL: "https://saas-template-backend-h032.onrender.com",
})

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
export const updateMe = (data) => api.put("/auth/me", data)
export const updatePassword = (data) => api.put("/auth/me/password", data)