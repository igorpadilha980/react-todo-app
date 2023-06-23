import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'

const router = createHashRouter([
  {
    index: true,
    element: <App />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  }
], {
  basename: import.meta.env.VITE_DEPLOY_BASE_URL || '/'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
