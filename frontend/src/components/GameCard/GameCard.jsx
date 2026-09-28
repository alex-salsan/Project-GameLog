const GameCard = ({game , onDelete, onEdit}) => {
  return (
    <div className='bg-gray-800 p-4 rounded-lg mb-3'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-bold text-white'>
            {game.name}
          </h3>
          <p className='text-gray-400 text-sm'>
            {new Date(game.played_at).toLocaleDateString()} · Nota: {game.rating}/10
          </p>
          {game.review && <p className='text-gray-300 mt-2'>{game.review}</p>}
        </div>
        <div className='flex gap-2'>
          <button onClick={() => onEdit(game)} className='text-blue-400 hover:text-blue-300'>
            Editar
          </button>
          <button onClick={() => onDelete(game.id)} className='text-red-400 hover:text-red-300'>
            Borrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCard