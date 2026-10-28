import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import { inputClasses, primaryButtonClasses, errorClasses } from '../styles/ui'

const GameForm = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [playedAt, setPlayedAt] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditing) return

    const loadGame = async () => {
      try {
        const res = await api.get(`/games/${id}/`)
        setName(res.data.name)
        setPlayedAt(res.data.played_at.slice(0, 16))
        setRating(res.data.rating)
        setReview(res.data.review || '')
      } catch {
        setError('No se pudo cargar la partida.')
      }
    }

    loadGame()
  }, [id, isEditing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = { name, played_at: playedAt, rating, review }

    try {
      if (isEditing) {
        await api.put(`/games/${id}/`, payload)
      } else {
        await api.post('/games/', payload)
      }
      toast.success(isEditing ? 'Partida actualizada' : 'Partida añadida')
      navigate('/dashboard')
    } catch {
      toast.error('No se pudo guardar la partida')
      setError('No se pudo guardar la partida. Revisa los datos.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 md:p-8">
      <h1 className="font-pixel text-xl leading-relaxed">
        {isEditing ? 'Editar partida' : 'Añadir juego'}
      </h1>
      <p className="mt-2 mb-6 text-muted">
        {isEditing
          ? 'Modifica los datos y guarda los cambios.'
          : 'Registra un juego que hayas jugado.'}
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 border-2 border-line bg-surface/80 p-4 shadow-[4px_4px_0_0_var(--color-line)] backdrop-blur-md sm:p-6"
      >
        <input
          type="text"
          placeholder="Nombre del juego"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          required
        />
        <input
          type="datetime-local"
          value={playedAt}
          onChange={(e) => setPlayedAt(e.target.value)}
          className={inputClasses}
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
          className={inputClasses}
          required
        />
        <textarea
          placeholder="Reseña (opcional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className={inputClasses}
          rows={4}
        />

        {error && (
          <p role="alert" className={errorClasses}>
            {error}
          </p>
        )}

        <button disabled={saving} className={primaryButtonClasses}>
          {saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Añadir partida'}
        </button>
      </form>
    </main>
  )
}

export default GameForm