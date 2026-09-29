import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddGame from './pages/AddGame'
import Community from './pages/Community'
import Navbar from './components/Navbar/Navbar'
import NotFound from './pages/NotFound'

const PrivateRoute = () => {
  const token = localStorage.getItem('access')
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#241E22] text-[#F5F1F3]">
      <Navbar />
      <Outlet />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<AddGame />} />
            <Route path="/dashboard/edit/:id" element={<AddGame />} />
            <Route path="/community" element={<Community />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App