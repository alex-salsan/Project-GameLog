import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Background from '../components/Background'

const AppLayout = () => {
  return (
    <div className="relative min-h-screen bg-night text-ink">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
