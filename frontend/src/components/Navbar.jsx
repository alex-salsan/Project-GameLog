import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { clearTokens } from '../services/auth'

const links = [
  { to: '/dashboard', label: 'Mi biblioteca', end: true },
  { to: '/dashboard/add', label: 'Añadir juego' },
  { to: '/community', label: 'Comunidad' },
]

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 px-4 pt-4">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 border-2 border-accent bg-nav/90 px-4 py-3 shadow-[4px_4px_0_0_var(--color-accent)] backdrop-blur-md">
        <NavLink
          to="/dashboard"
          className="font-pixel text-[16px] tracking-wider text-accent-soft outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          GAME LOG
        </NavLink>

        <ul className="flex flex-wrap items-center gap-1">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className="group relative block px-4 py-2 text-sm font-bold uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-accent"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-2 ${
                        isActive
                          ? 'text-night'
                          : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-current transition-opacity ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="border-2 border-line px-3 py-2 text-sm font-bold uppercase tracking-wider text-muted outline-none transition hover:border-red-300 hover:text-red-300 focus-visible:ring-2 focus-visible:ring-red-300"
        >
          Salir
        </button>
      </nav>
    </header>
  )
}

export default Navbar