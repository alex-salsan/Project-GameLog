import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Background from '../components/Background'
import { isAuthenticated } from '../services/auth'
import { primaryButtonClasses } from '../styles/ui'

const NotFound = () => {
  const isLoggedIn = isAuthenticated()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center text-ink">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-pixel text-6xl text-accent">404</p>

        <h1 className="mt-6 font-pixel text-xl leading-relaxed">
          Tu biblioteca se encuentra en otro lugar
        </h1>

        <p className="mt-3 max-w-md text-muted">
          La página que buscas no existe o ha cambiado de sitio. Puede que este
          juego todavía no esté en tu colección.
        </p>

        <Link
          to={isLoggedIn ? '/dashboard' : '/'}
          className={`${primaryButtonClasses} mt-8 inline-block px-6`}
        >
          {isLoggedIn ? 'Volver a mi biblioteca' : 'Volver al inicio'}
        </Link>
      </motion.div>
    </main>
  )
}

export default NotFound