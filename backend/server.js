const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const cropRoutes = require("./routes/crops")

dotenv.config()

const app = express()

// Enhanced CORS configuration for mobile apps
app.use(
  cors({
    origin: "*", // Allow all origins - you may want to restrict this in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Middleware
app.use(express.json())

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({
    success: false,
    message: "Server error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/agriculture-website", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// API Documentation route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AgroNeo API is running",
    version: "1.0.0",
    endpoints: {
      crops: {
        get_all: {
          method: "GET",
          url: "/api/crops",
          description: "Get all crops",
          query_params: {
            location: "Filter by location (optional)",
            date: "Filter by date (YYYY-MM-DD) (optional)",
            sort: "Sort by: Maxprice-asc, Maxprice-desc,Minprice-asc, Minprice-desc,Avgprice-asc, Avgprice-desc, name-asc, name-desc, date-asc, date-desc (optional)",
          },
        },
        get_latest: {
          method: "GET",
          url: "/api/crops/latest",
          description: "Get the latest price for each crop type",
        },
        get_locations: {
          method: "GET",
          url: "/api/crops/locations",
          description: "Get all unique locations",
        },
        get_by_location: {
          method: "GET",
          url: "/api/crops/by-location/:location",
          description: "Get all crops for a specific location",
        },
        get_by_id: {
          method: "GET",
          url: "/api/crops/:id",
          description: "Get crop by ID",
        },
      },
      auth: {
        login: {
          method: "POST",
          url: "/api/auth/login",
          description: "Login with email and password",
          body: {
            email: "required",
            password: "required",
          },
        },
        signup: {
          method: "POST",
          url: "/api/auth/signup",
          description: "Create a new admin account",
          body: {
            name: "required",
            email: "required",
            password: "required",
          },
        },
      },
    },
  })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/crops", cropRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
