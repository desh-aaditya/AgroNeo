const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const auth = require("../middleware/auth")

// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if user already exists
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: "User already exists" })
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    })

    await user.save()

    // Create JWT
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "24h" }, (err, token) => {
      if (err) throw err
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    })
  } catch (err) {
    console.error("Signup error:", err.message)
    res.status(500).send("Server error")
  }
})

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "24h" }, (err, token) => {
      if (err) throw err
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    })
  } catch (err) {
    console.error("Login error:", err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/auth/verify
// @desc    Verify token & get user data
// @access  Private
router.get("/verify", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json({ user })
  } catch (err) {
    console.error("Token verification error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
