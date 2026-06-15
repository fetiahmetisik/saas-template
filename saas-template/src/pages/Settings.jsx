import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMe, updateMe, updatePassword } from "../api"

export default function Settings() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({ name: "", email: "" })
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" })

  const [loading, setLoading] = useState(true)
  const [profileMsg, setProfileMsg] = useState("")
  const [profileErr, setProfileErr] = useState("")
  const [passwordMsg, setPasswordMsg] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  useEffect(() => {
    getMe()
      .then((res) => setProfile({ name: res.data.name, email: res.data.email }))
      .catch(() => {
        localStorage.removeItem("token")
        navigate("/login")
      })
      .finally(() => setLoading(false))
  }, [])

  function handleProfileChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  function handlePasswordChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  async function handleProfileSave(e) {
    e.preventDefault()
    setProfileMsg("")
    setProfileErr("")

    if (!profile.name || !profile.email) {
      setProfileErr("Tüm alanları doldur.")
      return
    }

    try {
      await updateMe(profile)
      setProfileMsg("Profil güncellendi.")
      setTimeout(() => setProfileMsg(""), 3000)
    } catch (err) {
      if (err.response?.status === 400) {
        setProfileErr(err.response.data.detail)
      } else {
        setProfileErr("Bir hata oluştu, tekrar dene.")
      }
    }
  }

  async function handlePasswordSave(e) {
    e.preventDefault()
    setPasswordErr("")
    setPasswordMsg("")

    if (!password.current || !password.new || !password.confirm) {
      setPasswordErr("Tüm alanları doldur.")
      return
    }
    if (password.new !== password.confirm) {
      setPasswordErr("Yeni şifreler eşleşmiyor.")
      return
    }
    if (password.new.length < 6) {
      setPasswordErr("Şifre en az 6 karakter olmalı.")
      return
    }

    try {
      await updatePassword({
        current_password: password.current,
        new_password: password.new,
      })
      setPasswordMsg("Şifre güncellendi.")
      setPassword({ current: "", new: "", confirm: "" })
      setTimeout(() => setPasswordMsg(""), 3000)
    } catch (err) {
      if (err.response?.status === 400) {
        setPasswordErr(err.response.data.detail)
      } else {
        setPasswordErr("Bir hata oluştu, tekrar dene.")
      }
    }
  }

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
          <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Dashboard
          </a>
          <a href="/settings" className="text-sm text-indigo-600 font-medium">
            Ayarlar
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{profile.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Çıkış yap
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">Ayarlar</h2>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Profil bilgileri</h3>
          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Ad Soyad</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {profileErr && <p className="text-sm text-red-500">{profileErr}</p>}
            {profileMsg && <p className="text-sm text-green-600">{profileMsg}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Şifre değiştir</h3>
          <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Mevcut şifre</label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Yeni şifre</label>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Yeni şifre (tekrar)</label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {passwordErr && <p className="text-sm text-red-500">{passwordErr}</p>}
            {passwordMsg && <p className="text-sm text-green-600">{passwordMsg}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Şifreyi güncelle
              </button>
            </div>
          </form>
        </div>

      </main>
    </div>
  )
}