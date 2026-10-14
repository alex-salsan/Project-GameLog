import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import AuthLayout from '../components/AuthLayout/AuthLayout'
import {
  inputClasses,
  labelClasses,
  primaryButtonClasses,
  errorClasses,
} from '../styles/ui'

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
          <label htmlFor="username" className={labelClasses}>
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
          <label htmlFor="password" className={labelClasses}>
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
          <p role="alert" className={errorClasses}>
            {error}
          </p>
        )}

        <button disabled={loading} className={primaryButtonClasses}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-[#BEB4BB]">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-bold text-[#99E1D9] hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login