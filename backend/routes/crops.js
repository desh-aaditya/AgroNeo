const express = require("express")
const router = express.Router()
const Crop = require("../models/Crop")
const auth = require("../middleware/auth")
const User = require("../models/User")

// @route   GET api/crops
// @desc    Get all crops
// @access  Public - Mobile apps can fetch this data
router.get("/", async (req, res) => {
  try {
    // Add query parameter options for filtering
    const { location, date, sort } = req.query
    const query = {}

    // Filter by location if provided
    if (location) {
      query.location = { $regex: location, $options: "i" } // Case-insensitive search
    }

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)
      query.date = { $gte: startDate, $lte: endDate }
    }

    // Set up sorting options - default to newest first
    let sortOption = { date: -1 } // Default sort by date (newest first)

    if (sort === "Maxprice-asc") {
      sortOption = { Maxprice: 1 }
    } else if (sort === "Maxprice-desc") {
      sortOption = { Maxprice: -1 }
    } else if (sort === "Minprice-asc") {
      sortOption = { Minprice: 1 }
    } else if (sort === "Minprice-desc") {
      sortOption = { Minprice: -1 }}
      if (sort === "Avgprice-asc") {
        sortOption = { Avgprice: 1 }
      } else if (sort === "Avgprice-desc") {
        sortOption = { Avgprice: -1 }}
      else if (sort === "name-asc") {
      sortOption = { cropName: 1 }
    } else if (sort === "name-desc") {
      sortOption = { cropName: -1 }
    } else if (sort === "date-asc") {
      sortOption = { date: 1 }
    }

    const crops = await Crop.find(query).sort(sortOption)

    // Format the response for consistency
    const formattedCrops = crops.map((crop) => ({
      _id: crop._id,
      id: crop._id,
      cropName: crop.cropName,
      Maxprice: crop.Maxprice,
      Minprice: crop.Minprice,
      Avgprice: crop.Avgprice,
      location: crop.location,
      date: crop.date,
      admin: crop.admin
        ? {
            name: crop.admin.name,
            id: crop.admin.id,
          }
        : { name: "Unknown", id: null },
      createdAt: crop.createdAt,
    }))

    res.json({
      success: true,
      count: formattedCrops.length,
      data: formattedCrops,
    })
  } catch (err) {
    console.error("Error fetching crops:", err.message)
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to fetch crop data",
    })
  }
})

// @route   GET api/crops/latest
// @desc    Get latest crop prices for each crop type
// @access  Public
router.get("/latest", async (req, res) => {
  try {
    // This aggregation will get the latest entry for each crop type
    const latestCrops = await Crop.aggregate([
      {
        $sort: { date: -1 }, // Sort by date descending
      },
      {
        $group: {
          _id: "$cropName",
          doc: { $first: "$$ROOT" }, // Take the first document in each group (latest)
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" }, // Replace the root with the document
      },
      {
        $sort: { cropName: 1 }, // Sort results by crop name
      },
    ])

    // Format the response
    const formattedCrops = latestCrops.map((crop) => ({
      id: crop._id,
      cropName: crop.cropName,
      Maxprice: crop.Maxprice,
      Minprice: crop.Minprice,
      Avgprice: crop.Avgprice,
      location: crop.location,
      date: crop.date,
      admin: crop.admin
        ? {
            name: crop.admin.name,
            id: crop.admin.id,
          }
        : { name: "Unknown", id: null },
      createdAt: crop.createdAt,
    }))

    res.json({
      success: true,
      count: formattedCrops.length,
      data: formattedCrops,
    })
  } catch (err) {
    console.error("Error fetching latest crops:", err.message)
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to fetch latest crop data",
    })
  }
})

// @route   GET api/crops/locations
// @desc    Get all unique locations
// @access  Public
router.get("/locations", async (req, res) => {
  try {
    const locations = await Crop.distinct("location")

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    })
  } catch (err) {
    console.error("Error fetching locations:", err.message)
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to fetch location data",
    })
  }
})

// @route   GET api/crops/by-location/:location
// @desc    Get all crops for a specific location
// @access  Public
router.get("/by-location/:location", async (req, res) => {
  try {
    const location = req.params.location
    const crops = await Crop.find({
      location: { $regex: new RegExp(location, "i") }, // Case insensitive search
    }).sort({ date: -1 })

    // Format the response
    const formattedCrops = crops.map((crop) => ({
      id: crop._id,
      cropName: crop.cropName,
      Maxprice: crop.Maxprice,
      Minprice: crop.Minprice,
      Avgprice:crop.Avgprice,
      location: crop.location,
      date: crop.date,
      admin: crop.admin
        ? {
            name: crop.admin.name,
            id: crop.admin.id,
          }
        : { name: "Unknown", id: null },
      createdAt: crop.createdAt,
    }))

    res.json({
      success: true,
      location: location,
      count: formattedCrops.length,
      data: formattedCrops,
    })
  } catch (err) {
    console.error("Error fetching crops by location:", err.message)
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to fetch crop data by location",
    })
  }
})

// @route   POST api/crops
// @desc    Add a new crop rate
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { cropName, Maxprice,Minprice,Avgprice, location, date } = req.body

    // Debug log to see what's being received
    console.log("Received crop data:", { cropName, Maxprice,Minprice,Avgprice, location, date })
    console.log("User ID from token:", req.user.id)

    // Validate required fields
    if (!cropName || !Maxprice || !Minprice || !Avgprice|| !location || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: cropName, price, location, date",
      })
    }

    // Get user information
    const user = await User.findById(req.user.id).select("name")

    if (!user) {
      console.log("User not found with ID:", req.user.id)
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    console.log("Found user:", user)

    // Create new crop entry
    const newCrop = new Crop({
      cropName,
      Maxprice: Number.parseFloat(Maxprice),
      Minprice: Number.parseFloat(Minprice),
      Avgprice: Number.parseFloat(Avgprice), 
      location,
      date: new Date(date),
      admin: {
        name: user.name,
        id: user._id,
      },
    })

    console.log("Created crop object:", newCrop)

    // Save to database
    const crop = await newCrop.save()
    console.log("Saved crop:", crop)

    // Return the created crop with formatted response
    res.status(201).json({
      success: true,
      message: "Crop rate added successfully",
      data: {
        id: crop._id,
        cropName: crop.cropName,
        Maxprice: crop.Maxprice,
        Minprice: crop.Minprice,
        Avgprice: crop.Avgprice,
        location: crop.location,
        date: crop.date,
        admin: {
          name: crop.admin.name,
          id: crop.admin.id,
        },
        createdAt: crop.createdAt,
      },
    })
  } catch (err) {
    console.error("Error adding crop rate:", err)
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to add crop rate",
    })
  }
})

// @route   GET api/crops/:id
// @desc    Get crop by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      })
    }

    // Return formatted crop data
    res.json({
      success: true,
      data: {
        id: crop._id,
        cropName: crop.cropName,
        Maxprice: crop.Maxprice,
        Minprice: crop.Minprice,
        Avgprice: crop.Avgprice,
        location: crop.location,
        date: crop.date,
        admin: crop.admin
          ? {
              name: crop.admin.name,
              id: crop.admin.id,
            }
          : { name: "Unknown", id: null },
        createdAt: crop.createdAt,
      },
    })
  } catch (err) {
    console.error("Error fetching crop:", err.message)

    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      })
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to fetch crop data",
    })
  }
})

// @route   DELETE api/crops/:id
// @desc    Delete a crop
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      })
    }

    await crop.deleteOne()
    res.json({
      success: true,
      message: "Crop removed",
    })
  } catch (err) {
    console.error("Error removing crop:", err.message)

    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      })
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to remove crop",
    })
  }
})

module.exports = router
