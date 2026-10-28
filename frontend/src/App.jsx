import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import GameForm from './pages/GameForm'
import Community from './pages/Community'
import NotFound from './pages/NotFound'
import AppLayout from './layouts/AppLayout'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        containerStyle={{ top: 100 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-ink)',
            border: '1px solid var(--color-line)',
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<GameForm />} />
            <Route path="/dashboard/edit/:id" element={<GameForm />} />
            <Route path="/community" element={<Community />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
