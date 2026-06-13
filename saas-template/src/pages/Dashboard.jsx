import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMe } from "../api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token")
        navigate("/login")
      })
      .finally(() => setLoading(false))
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-gray-800">SaaS Template</span>
          <a href="/dashboard" className="text-sm text-indigo-600 font-medium">
            Dashboard
          </a>
          <a href="/settings" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Ayarlar
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Çıkış yap
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Hoş geldin, {user.name} 👋
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Hesabın {new Date(user.created_at).toLocaleDateString("tr-TR", {
              year: "numeric", month: "long", day: "numeric"
            })} tarihinde oluşturuldu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Toplam kullanıcı", value: "128" },
            { label: "Bu ay giriş", value: "47" },
            { label: "Aktif oturum", value: "12" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Profil bilgileri</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Ad Soyad", value: user.name },
              { label: "E-posta", value: user.email },
              { label: "Plan", value: user.plan },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className="text-sm text-gray-800 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Son aktivite</h3>
          <div className="flex flex-col gap-2">
            {[
              { action: "Giriş yapıldı", time: "Az önce", color: "bg-green-100 text-green-700" },
              { action: "Profil görüntülendi", time: "2 dk önce", color: "bg-blue-100 text-blue-700" },
              { action: "Ayarlar açıldı", time: "5 dk önce", color: "bg-gray-100 text-gray-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.color}`}>
                  {item.action}
                </span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}