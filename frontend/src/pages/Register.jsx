import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import AuthLayout from '../layouts/AuthLayout'
import {
  inputClasses,
  labelClasses,
  primaryButtonClasses,
  errorClasses,
} from '../styles/ui'

const Register = () => {
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
      await api.post('/register/', { username, password })
      toast.success('Cuenta creada. Ya puedes iniciar sesión')
      navigate('/login')
    } catch {
      setError('No se pudo registrar. Prueba con otro nombre de usuario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Crear cuenta">
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
            autoComplete="new-password"
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
          {loading ? 'Creando cuenta…' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-muted">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-bold text-accent-soft hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Register