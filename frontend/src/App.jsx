import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddGame from './pages/AddGame'
import Community from './pages/Community'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
import Background from './components/Background/Background'

const PrivateRoute = () => {
  const token = localStorage.getItem('access')
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

const AppLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#241E22] text-[#F5F1F3]">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        containerStyle={{ top: 100 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#3D323A',
            color: '#F5F1F3',
            border: '1px solid #594A54',
          },
          success: {
            iconTheme: { primary: '#63C7BE', secondary: '#241E22' },
          },
          error: {
            iconTheme: { primary: '#F87171', secondary: '#241E22' },
          },
        }}
      />

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