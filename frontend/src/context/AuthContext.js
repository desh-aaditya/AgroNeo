"use client"

import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react"

const AuthContext = createContext()

export const useAuth = () =>
  useContext(AuthContext)

export const AuthProvider = ({
  children
}) => {

  const [
    isAuthenticated,
    setIsAuthenticated
  ] = useState(false)

  const [user, setUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  // Check local storage on refresh

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    const savedUser =
      localStorage.getItem("user")

    if (token && savedUser) {

      setIsAuthenticated(true)

      setUser(
        JSON.parse(savedUser)
      )

    }

    setLoading(false)

  }, [])

  // LOGIN

  const login = async (
    email,
    password
  ) => {

    try {

      // Demo credentials

      if (
        email === "xyz@gmail.com" &&
        password === "test123"
      ) {

        const demoUser = {
          name: "Admin",
          email: email
        }

        // Fake token

        localStorage.setItem(
          "token",
          "demo-token"
        )

        localStorage.setItem(
          "user",
          JSON.stringify(demoUser)
        )

        setUser(demoUser)

        setIsAuthenticated(true)

        return true
      }

      return false

    } catch (error) {

      console.error(
        "Login Error:",
        error
      )

      return false
    }
  }

  // SIGNUP

  const signup = async (
    name,
    email,
    password
  ) => {

    try {

      const newUser = {
        name,
        email
      }

      localStorage.setItem(
        "token",
        "demo-token"
      )

      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      )

      setUser(newUser)

      setIsAuthenticated(true)

      return true

    } catch (error) {

      console.error(
        "Signup Error:",
        error
      )

      return false
    }
  }

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "user"
    )

    setUser(null)

    setIsAuthenticated(false)
  }

  return (

    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  )
}