import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import AuthLayout from '../components/AuthLayout/AuthLayout'

const inputClasses =
  'w-full rounded-lg border border-[#665560] bg-[#4B3D46] p-3 text-[#F5F1F3] placeholder:text-[#BEB4BB] outline-none focus:border-[#63C7BE] focus:ring-2 focus:ring-[#63C7BE]/30'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/login/', { username, password })
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      navigate('/dashboard')
    } catch {
      setError('Usuario o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm text-[#BEB4BB]">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-[#BEB4BB]">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200"
          >
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="rounded-lg bg-[#63C7BE] p-3 font-semibold text-[#241E22] transition hover:bg-[#7AD8D0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#99E1D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3D323A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-[#BEB4BB]">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-medium text-[#99E1D9] hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login