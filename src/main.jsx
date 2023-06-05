import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './LoginPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import { AuthProvider } from './auth/AuthContext.jsx'
import { SignUpPage } from './SignUpPage.jsx'

const router = createBrowserRouter([
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
