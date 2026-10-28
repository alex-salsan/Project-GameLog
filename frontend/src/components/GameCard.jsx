import { motion } from 'motion/react'

const getRatingStyle = (rating) => {
  const value = Number(rating)
  if (value >= 7) return 'border-accent/50 bg-accent/15 text-accent-soft'
  if (value >= 5) return 'border-amber-300/50 bg-amber-300/15 text-amber-200'
  return 'border-red-400/50 bg-red-400/15 text-red-200'
}

const GameCard = ({ game, index = 0, onDelete, onEdit }) => {
  const formattedDate = new Date(game.played_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-none border-2 border-line bg-surface/80 p-5 shadow-[4px_4px_0_0_var(--color-line)] backdrop-blur-md transition-shadow hover:border-accent hover:shadow-[6px_6px_0_0_var(--color-accent)]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-ink">
            {game.name}
          </h3>
          <span
            className={`shrink-0 border-2 px-3 py-1 font-pixel text-[16px] ${getRatingStyle(game.rating)}`}
          >
            {game.rating}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted">{formattedDate}</p>

        {game.review && (
          <p className="mt-3 line-clamp-3 text-ink-soft">{game.review}</p>
        )}
      </div>

      <div className="mt-5 flex gap-2 border-t-2 border-line pt-4">
        <button
          onClick={() => onEdit(game)}
          className="border-2 border-transparent px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-accent-soft transition hover:border-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(game.id)}
          className="border-2 border-transparent px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-red-300 transition hover:border-red-300 hover:bg-red-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          Borrar
        </button>
      </div>
    </motion.article>
  )
}

export default GameCard