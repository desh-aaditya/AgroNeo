const mongoose = require("mongoose")

const CropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    index: true, // Add index for faster queries by crop name
  },
  Maxprice: {
    type: Number,
    required: true,
  },
  Minprice: {
    type: Number,
    required: true,
  },
  Avgprice: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    index: true, // Add index for faster location-based queries
  },
  date: {
    type: Date,
    required: true,
    index: true, // Add index for date-based queries and sorting
  },
  admin: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Add compound index for common query patterns
CropSchema.index({ location: 1, date: -1 })
CropSchema.index({ cropName: 1, date: -1 })

module.exports = mongoose.model("Crop", CropSchema)
