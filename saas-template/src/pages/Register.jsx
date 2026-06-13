import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser, loginUser } from "../api"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!form.name || !form.email || !form.password) {
      setError("Tüm alanları doldur.")
      return
    }

    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.")
      return
    }

    setLoading(true)

    try {
      // Kayıt ol
      await registerUser(form)
      // Başarılıysa otomatik giriş yap
      const res = await loginUser({ email: form.email, password: form.password })
      localStorage.setItem("token", res.data.access_token)
      navigate("/dashboard")
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Bu e-posta zaten kayıtlı.")
      } else {
        setError("Bir hata oluştu, tekrar dene.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Kayıt ol</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ad Soyad"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Şifre</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Kayıt olunuyor..." : "Kayıt ol"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Zaten hesabın var mı?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  )
}