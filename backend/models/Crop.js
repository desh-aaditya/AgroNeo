const mongoose = require("mongoose")

const CropSchema = new mongoose.Schema({

  cropName: {

    type: String,

    required: true,

    index: true,

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

    index: true,

  },

  date: {

    type: Date,

    required: true,

    index: true,

  },

  // OPTIONAL ADMIN

  admin: {

    name: {

      type: String,

      default: "Admin",

    },

    id: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: false,

    },

  },

  createdAt: {

    type: Date,

    default: Date.now,

  },

})

// Indexes

CropSchema.index({

  location: 1,

  date: -1

})

CropSchema.index({

  cropName: 1,

  date: -1

})

module.exports =
  mongoose.model(
    "Crop",
    CropSchema
  )