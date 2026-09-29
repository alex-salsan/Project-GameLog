import { Link } from 'react-router-dom'

const NotFound = () => {
  const isLoggedIn = Boolean(localStorage.getItem('access'))

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#241E22] px-6 text-center text-[#F5F1F3]">
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
        className="mt-8 rounded-lg bg-[#63C7BE] px-6 py-3 font-semibold text-[#241E22] transition hover:bg-[#7AD8D0] focus:outline-none focus:ring-2 focus:ring-[#99E1D9] focus:ring-offset-2 focus:ring-offset-[#241E22]"
      >
        {isLoggedIn ? 'Volver a mi biblioteca' : 'Ir al inicio de sesión'}
      </Link>
    </main>
  )
}

export default NotFound