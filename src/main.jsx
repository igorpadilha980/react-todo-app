import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'

const router = createHashRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
