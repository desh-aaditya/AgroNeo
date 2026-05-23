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
import CropRates from "./pages/CropRates"
import Prediction from "./pages/Prediction" // ✅ Added import

// Protected Route Component
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

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/crop-rates" element={<CropRates />} />

          {/* Protected Routes */}
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

          {/* AI Prediction Route */}
          <Route
  path="/prediction"
  element={<Prediction />}
/>

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App