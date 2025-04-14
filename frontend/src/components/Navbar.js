"use client"
import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa"

const Navbar = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState("") // State for logout message
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    setLogoutMessage("You have logged out successfully") // Set the logout message
    setTimeout(() => {
      setLogoutMessage("") // Clear the message after 3 seconds
      navigate("/login")
    }, 3000)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="AgroNeo Logo" className="h-16 w-auto" />
            <Link to="/" className="text-3xl font-bold">
              AgroNeo
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6">
  <Link to="/" className="px-2 py-1 transition duration-30 hover:text-black hover:underline underline-offset-4">
    Home
  </Link>
  <Link to="/marketplace" className="px-2 py-1 transition duration-30 hover:text-black hover:underline underline-offset-4">
    Marketplace
  </Link>
  <Link to="/government-schemes" className="px-2 py-1 transition duration-30 hover:text-black hover:underline underline-offset-4">
    Government Schemes
  </Link>
  <Link to="/expert-talk" className="px-2 py-1 transition duration-30 hover:text-black hover:underline underline-offset-4">
    Expert Talk
  </Link>
</div>



          {/* Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user && (
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center w-15 h-15 rounded-full bg-green-600 hover:bg-green-500 transition"
              >
                {/* If user has profile image use <img>, else fallback */}
                <span className="flex items-center justify-center text-white font-bold text-2xl uppercase w-16 h-16">
                  {user.name?.[0] || <FaUserCircle size={30} />}
                </span>
              </button>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-gray-800 border-b">Signed in as <br /><strong>{user.name}</strong></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logout message */}
        {logoutMessage && (
          <div className="bg-green-500 text-white text-center py-2 mt-2">
            {logoutMessage}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
