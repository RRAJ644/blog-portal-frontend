import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axiosInstance
        .get('/user')
        .then((response) => {
          setUser(response.data.user)
          setIsAuthenticated(true)
          navigate('/dashboard')
        })
        .catch(() => {
          localStorage.removeItem('token')
          navigate('/login')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      navigate('/')
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axiosInstance
        .post('/login', {
          email,
          password,
        })
        .then((response) => {
          localStorage.setItem('token', response?.data?.token)
          setUser(response?.data?.user)
          setIsAuthenticated(true)
          navigate('/dashboard')
        })
        .catch((err) => {
          navigate('/login')
        })
    } catch (error) {
      console.error('Failed to login', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
