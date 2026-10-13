import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const linkClasses = ({ isActive }) =>
    [
      'rounded-lg px-4 py-2 text-sm font-medium transition',
      'focus:outline-none focus:ring-2 focus:ring-[#63C7BE]',
      isActive
        ? 'bg-[#63C7BE] text-[#241E22]'
        : 'text-[#BEB4BB] hover:bg-[#4B3D46] hover:text-[#F5F1F3]',
    ].join(' ')

    const handleLogout = () => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      navigate('/login')
    }

  return (
    <header className="border-b border-[#594A54] bg-[#32292F]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink
          to="/dashboard"
          className="font-pixel text-xs tracking-wider text-[#99E1D9] md:text-sm"
        >
          GAME LOG
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/dashboard" end className={linkClasses}>
            Mi biblioteca
          </NavLink>

          <NavLink to="/dashboard/add" className={linkClasses}>
            Añadir juego
          </NavLink>

          <NavLink to="/community" className={linkClasses}>
            Comunidad
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#BEB4BB] transition hover:text-[#63C7BE] focus:outline-none focus:ring-2 focus:ring-[#63C7BE]"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar