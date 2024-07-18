import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    children: [
      { path: '/login', element: <Login /> },
      {
        path: '/dashboard',
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
