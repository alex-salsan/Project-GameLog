import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Background from '../components/Background/Background'

const NotFound = () => {
  const isLoggedIn = Boolean(localStorage.getItem('access'))

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#241E22] px-6 text-center text-[#F5F1F3]">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-pixel text-6xl text-[#63C7BE]">404</p>

        <h1 className="mt-6 font-pixel text-xl leading-relaxed">
          Tu biblioteca se encuentra en otro lugar
        </h1>

        <p className="mt-3 max-w-md text-[#BEB4BB]">
          La página que buscas no existe o ha cambiado de sitio. Puede que este
          juego todavía no esté en tu colección.
        </p>

        <Link
          to={isLoggedIn ? '/dashboard' : '/login'}
          className="mt-8 inline-block border-2 border-[#63C7BE] bg-[#63C7BE] px-6 py-3 font-bold uppercase tracking-wider text-[#241E22] shadow-[4px_4px_0_0_#99E1D9] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#99E1D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99E1D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#241E22]"
        >
          {isLoggedIn ? 'Volver a mi biblioteca' : 'Ir al inicio de sesión'}
        </Link>
      </motion.div>
    </main>
  )
}

export default NotFound