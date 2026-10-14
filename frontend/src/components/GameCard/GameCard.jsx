import { motion } from 'motion/react'

const getRatingStyle = (rating) => {
  const value = Number(rating)
  if (value >= 7) return 'border-[#63C7BE]/50 bg-[#63C7BE]/15 text-[#99E1D9]'
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
      className="flex flex-col justify-between rounded-none border-2 border-[#594A54] bg-[#3D323A]/80 p-5 shadow-[4px_4px_0_0_#594A54] backdrop-blur-md transition-shadow hover:border-[#63C7BE] hover:shadow-[6px_6px_0_0_#63C7BE]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-[#F5F1F3]">
            {game.name}
          </h3>
          <span
            className={`shrink-0 border-2 px-3 py-1 font-pixel text-[16px] ${getRatingStyle(game.rating)}`}
          >
            {game.rating}
          </span>
        </div>

        <p className="mt-1 text-sm text-[#BEB4BB]">{formattedDate}</p>

        {game.review && (
          <p className="mt-3 line-clamp-3 text-[#D8CFD5]">{game.review}</p>
        )}
      </div>

      <div className="mt-5 flex gap-2 border-t-2 border-[#594A54] pt-4">
        <button
          onClick={() => onEdit(game)}
          className="border-2 border-transparent px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-[#99E1D9] transition hover:border-[#63C7BE] hover:bg-[#63C7BE]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63C7BE]"
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