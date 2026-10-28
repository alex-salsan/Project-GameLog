import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import GameCard from '../components/GameCard'
import { AnimatePresence } from 'motion/react'
import toast from 'react-hot-toast'
import { primaryButtonClasses, errorClasses } from '../styles/ui'

const Dashboard = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false

    api
      .get('/games/')
      .then((res) => {
        if (!ignore) setGames(res.data)
      })
      .catch(() => {
        if (!ignore) setError('No se pudieron cargar tus partidas. Inténtalo de nuevo.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const handleEdit = (game) => {
    navigate(`/dashboard/edit/${game.id}`)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres borrar esta partida?')) return
    try {
      await api.delete(`/games/${id}/`)
      setGames((current) => current.filter((game) => game.id !== id))
      toast.success('Partida borrada')
    } catch {
      toast.error('No se pudo borrar la partida')
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="mb-6">
        <h1 className="font-pixel text-xl leading-relaxed">Mi biblioteca</h1>
        <p className="mt-2 text-muted">
          Tus partidas, reseñas y puntuaciones en un solo lugar.
        </p>
      </div>

      {loading && <p className="text-muted">Cargando partidas…</p>}

      {error && (
        <p role="alert" className={`${errorClasses} mb-4`}>
          {error}
        </p>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="border-2 border-line bg-surface/80 p-10 text-center shadow-[4px_4px_0_0_var(--color-line)] backdrop-blur-md">
          <p className="text-lg font-medium">Aún no has registrado ninguna partida</p>
          <p className="mt-2 text-muted">
            Empieza tu biblioteca añadiendo el primer juego.
          </p>
          <Link
            to="/dashboard/add"
            className={`${primaryButtonClasses} mt-6 inline-block px-5`}
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