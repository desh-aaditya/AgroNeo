"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Pages
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Marketplace from "./pages/Marketplace"
import GovernmentSchemes from "./pages/GovernmentSchemes"
import ExpertTalk from "./pages/ExpertTalk"
import CropRates from "./pages/CropRates" // ✅ New page to fetch crops

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government-schemes"
            element={
              <ProtectedRoute>
                <GovernmentSchemes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert-talk"
            element={
              <ProtectedRoute>
                <ExpertTalk />
              </ProtectedRoute>
            }
          />

          {/* ✅ New public route for mobile-like data preview */}
          <Route path="/crop-rates" element={<CropRates />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
