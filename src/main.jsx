import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import './index.css'
import { AuthProvider } from './state/auth/AuthContext.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import SelectStorage from './pages/SelectStorage.jsx'
import TaskServiceProvider from './state/tasks/TaskServiceProvider.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SelectStorage />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskServiceProvider>
        <RouterProvider router={router} />
      </TaskServiceProvider>
    </AuthProvider>
  </React.StrictMode>,
)
