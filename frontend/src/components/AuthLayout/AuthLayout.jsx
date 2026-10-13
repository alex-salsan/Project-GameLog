import { motion } from 'motion/react'
import Background from '../Background/Background'

const AuthLayout = ({ title, children }) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#241E22] px-6 py-10 text-[#F5F1F3]">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
      >
        <p className="mb-8 text-center font-pixel text-[16px] tracking-wider text-[#99E1D9]">
          GAME LOG
        </p>

        <div className="rounded-2xl border border-[#594A54] bg-[#3D323A]/80 p-6 shadow-lg backdrop-blur-md sm:p-8">
          <h1 className="mb-6 font-pixel text-[16px] leading-relaxed">{title}</h1>
          {children}
        </div>
      </motion.div>
    </main>
  )
}

export default AuthLayout