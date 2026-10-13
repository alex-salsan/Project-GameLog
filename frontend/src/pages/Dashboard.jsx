import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import GameCard from '../components/GameCard/GameCard'
import { AnimatePresence } from 'motion/react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchGames = async () => {
    try {
      const res = await api.get('/games/')
      setGames(res.data)
      setError('')
    } catch {
      setError('No se pudieron cargar tus partidas. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const handleEdit = (game) => {
    navigate(`/dashboard/edit/${game.id}`)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres borrar esta partida?')) return
    try {
      await api.delete(`/games/${id}/`)
      toast.success('Partida borrada')
      fetchGames()
    } catch {
      toast.error('No se pudo borrar la partida')
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="mb-6">
        <h1 className="font-pixel text-xl leading-relaxed">Mi biblioteca</h1>
        <p className="mt-2 text-[#BEB4BB]">
          Tus partidas, reseñas y puntuaciones en un solo lugar.
        </p>
      </div>

      {loading && <p className="text-[#BEB4BB]">Cargando partidas…</p>}

      {error && (
        <p className="mb-4 rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-red-200">
          {error}
        </p>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="rounded-2xl border border-[#594A54] bg-[#3D323A]/80 backdrop-blur-md p-10 text-center">
          <p className="text-lg font-medium">Aún no has registrado ninguna partida</p>
          <p className="mt-2 text-[#BEB4BB]">
            Empieza tu biblioteca añadiendo el primer juego.
          </p>
          <Link
            to="/dashboard/add"
            className="mt-6 inline-block rounded-lg bg-[#63C7BE] px-5 py-3 font-semibold text-[#241E22] transition hover:bg-[#7AD8D0]"
          >
            Añadir la primera
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default Dashboard