import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const inputClasses =
  'p-3 rounded-lg bg-[#4B3D46] text-[#F5F1F3] placeholder:text-[#BEB4BB] border border-[#665560] outline-none focus:border-[#63C7BE] focus:ring-2 focus:ring-[#63C7BE]/30'

const AddGame = () => {
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
      <p className="mt-2 mb-6 text-[#BEB4BB]">
        {isEditing
          ? 'Modifica los datos y guarda los cambios.'
          : 'Registra un juego que hayas jugado.'}
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-2xl border border-[#594A54] bg-[#3D323A]/80 backdrop-blur-md p-4 shadow-lg"
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
          <p className="rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-red-200">
            {error}
          </p>
        )}

        <button
          disabled={saving}
          className="rounded-lg bg-[#63C7BE] p-3 font-semibold text-[#241E22] transition hover:bg-[#7AD8D0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Añadir partida'}
        </button>
      </form>
    </main>
  )
}

export default AddGame