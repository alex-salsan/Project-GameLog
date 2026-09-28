import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/register/', { username, password })
      navigate('/login')
    } catch (err) {
      setError('No se pudo registrar. Prueba con otro nombre de usuario.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-80">
        <h1 className="text-2xl font-bold text-white mb-6">Crear cuenta</h1>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Registrarse
        </button>

        <p className="text-gray-400 mt-4 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}

export default Register