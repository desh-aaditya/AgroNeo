"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Set up axios defaults
  const setupAxiosDefaults = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")

        if (token) {
          setupAxiosDefaults(token)

          try {
            const response = await axios.get("http://localhost:5000/api/auth/verify")
            setUser(response.data.user)
            setIsAuthenticated(true)
          } catch (error) {
            console.error("Token verification failed:", error)
            localStorage.removeItem("token")
            setupAxiosDefaults(null)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("token")
        setupAxiosDefaults(null)
      }

      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })

      const { token, user } = response.data

      // Store token and set axios defaults
      localStorage.setItem("token", token)
      setupAxiosDefaults(token)

      setUser(user)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      })

      const { token, user } = response.data

      // Store token and set axios defaults
      localStorage.setItem("token", token)
      setupAxiosDefaults(token)

      setUser(user)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setupAxiosDefaults(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
