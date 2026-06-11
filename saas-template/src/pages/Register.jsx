export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Kayıt ol</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Ad Soyad</label>
            <input
              type="text"
              placeholder="Ad Soyad"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">E-posta</label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition-colors">
            Kayıt ol
          </button>
        </div>

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