const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization")

  // Debug log
  console.log("Auth header:", authHeader)

  // Check if no auth header
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  // Extract token (handle both "Bearer token" and just "token" formats)
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")

    // Debug log
    console.log("Decoded token:", decoded)

    // Add user from payload
    req.user = decoded.user
    next()
  } catch (err) {
    console.error("Token verification error:", err)
    res.status(401).json({ msg: "Token is not valid" })
  }
}
