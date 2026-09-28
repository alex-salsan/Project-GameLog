import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import GameCard from '../components/GameCard/GameCard'

const Dashboard = () => {
  const [games, setGames] = useState([])
  const [name, setName] = useState('')
  const [playedAt, setPlayedAt] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  const fetchGames = async () => {
    const res = await api.get('/games/')
    setGames(res.data)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const resetForm = () => {
    setName('')
    setPlayedAt('')
    setRating('')
    setReview('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { name, played_at: playedAt, rating, review }
    if (editingId) {
      await api.put(`/games/${editingId}/`, payload)
    } else {
      await api.post('/games/', payload)
    }
    resetForm()
    fetchGames()
  }

  const handleEdit = (game) => {
    setEditingId(game.id)
    setName(game.name)
    setPlayedAt(game.played_at.slice(0, 16))
    setRating(game.rating)
    setReview(game.review || '')
  }

  const handleDelete = async (id) => {
    await api.delete(`/games/${id}/`)
    if (id === editingId) {
      resetForm()
    }
    fetchGames()
  }

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis partidas</h1>
        <button onClick={handleLogout} className="text-gray-400 hover:text-white">
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-6 grid gap-3">
        <input
          type="text"
          placeholder="Nombre del juego"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="datetime-local"
          value={playedAt}
          onChange={(e) => setPlayedAt(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="Nota (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <textarea
          placeholder="Reseña (opcional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button className="bg-blue-600 p-2 rounded hover:bg-blue-700">
          {editingId ? 'Guardar cambios' : 'Añadir partida'}
        </button>
      </form>

      {games.map((game) => (
        <GameCard key={game.id} game={game} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </div>
  )
}

export default Dashboard