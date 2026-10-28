import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Background from '../components/Background'
import { isAuthenticated } from '../services/auth'
import { primaryButtonClasses } from '../styles/ui'

const features = [
  {
    title: 'Registra',
    text: 'Guarda cada juego que terminas con la fecha en que lo jugaste.',
  },
  {
    title: 'Puntúa',
    text: 'Ponle una nota del 0 al 10 y escribe tu reseña.',
  },
  {
    title: 'Recuerda',
    text: 'Toda tu biblioteca de partidas en un solo lugar.',
  },
]

const secondaryButtonClasses =
  'inline-block border-2 border-line px-6 py-3 font-bold uppercase tracking-wider text-muted transition hover:border-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

const Home = () => {
  const isLoggedIn = isAuthenticated()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-night px-6 py-16 text-center text-ink">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center"
      >
        <h1 className="font-pixel text-3xl leading-relaxed tracking-wider text-accent-soft sm:text-5xl">
          GAME LOG
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted">
          Tu diario de videojuegos. Apunta lo que juegas, ponle nota y no
          olvides nunca qué te pareció.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {isLoggedIn ? (
            <Link to="/dashboard" className={`${primaryButtonClasses} inline-block px-6`}>
              Ir a mi biblioteca
            </Link>
          ) : (
            <>
              <Link to="/register" className={`${primaryButtonClasses} inline-block px-6`}>
                Crear cuenta
              </Link>
              <Link to="/login" className={secondaryButtonClasses}>
                Iniciar sesión
              </Link>
            </>
          )}
        </div>

        <ul className="mt-16 grid w-full gap-4 text-left sm:grid-cols-3">
          {features.map(({ title, text }, index) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + index * 0.1 } }}
              className="border-2 border-line bg-surface/80 p-5 shadow-[4px_4px_0_0_var(--color-line)] backdrop-blur-md"
            >
              <h2 className="font-pixel text-[14px] leading-relaxed text-accent-soft">
                {title}
              </h2>
              <p className="mt-3 text-ink-soft">{text}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </main>
  )
}

export default Home
