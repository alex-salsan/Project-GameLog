import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Background from '../components/Background'

const AuthLayout = ({ title, children }) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-night px-6 py-10 text-ink">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Link
          to="/"
          className="mb-8 block text-center font-pixel text-[16px] tracking-wider text-accent-soft outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          GAME LOG
        </Link>

        <div className="border-2 border-accent bg-surface/80 p-6 shadow-[6px_6px_0_0_var(--color-accent)] backdrop-blur-md sm:p-8">
          <h1 className="mb-6 font-pixel text-[16px] leading-relaxed">{title}</h1>
          {children}
        </div>
      </motion.div>
    </main>
  )
}

export default AuthLayout