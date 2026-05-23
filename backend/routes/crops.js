const express = require("express")
const router = express.Router()

const Crop = require("../models/Crop")

// ==============================
// GET ALL CROPS
// ==============================

router.get("/", async (req, res) => {

  try {

    const {
      location,
      date,
      sort
    } = req.query

    const query = {}

    // Filter by location

    if (location) {

      query.location = {
        $regex: location,
        $options: "i"
      }

    }

    // Filter by date

    if (date) {

      const startDate = new Date(date)

      startDate.setHours(
        0, 0, 0, 0
      )

      const endDate = new Date(date)

      endDate.setHours(
        23, 59, 59, 999
      )

      query.date = {
        $gte: startDate,
        $lte: endDate
      }
    }

    // Sorting

    let sortOption = {
      date: -1
    }

    if (sort === "Maxprice-asc") {

      sortOption = { Maxprice: 1 }

    } else if (
      sort === "Maxprice-desc"
    ) {

      sortOption = { Maxprice: -1 }

    } else if (
      sort === "Minprice-asc"
    ) {

      sortOption = { Minprice: 1 }

    } else if (
      sort === "Minprice-desc"
    ) {

      sortOption = { Minprice: -1 }

    } else if (
      sort === "Avgprice-asc"
    ) {

      sortOption = { Avgprice: 1 }

    } else if (
      sort === "Avgprice-desc"
    ) {

      sortOption = { Avgprice: -1 }

    } else if (
      sort === "name-asc"
    ) {

      sortOption = { cropName: 1 }

    } else if (
      sort === "name-desc"
    ) {

      sortOption = { cropName: -1 }

    }

    const crops =
      await Crop.find(query)
        .sort(sortOption)

    res.json({
      success: true,
      count: crops.length,
      data: crops
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      success: false,
      message: "Server Error"
    })

  }

})

// ==============================
// GET LATEST CROPS
// ==============================

router.get("/latest", async (req, res) => {

  try {

    const latestCrops =
      await Crop.aggregate([

        {
          $sort: { date: -1 }
        },

        {
          $group: {
            _id: "$cropName",
            doc: {
              $first: "$$ROOT"
            }
          }
        },

        {
          $replaceRoot: {
            newRoot: "$doc"
          }
        }

      ])

    res.json({
      success: true,
      data: latestCrops
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      success: false,
      message: "Server Error"
    })

  }

})

// ==============================
// GET LOCATIONS
// ==============================

router.get(
  "/locations",
  async (req, res) => {

    try {

      const locations =
        await Crop.distinct(
          "location"
        )

      res.json({
        success: true,
        data: locations
      })

    } catch (err) {

      console.error(err)

      res.status(500).json({
        success: false,
        message: "Server Error"
      })

    }

  }
)

// ==============================
// ADD CROP RATE
// ==============================

router.post("/", async (req, res) => {

  try {

    const {
      cropName,
      Maxprice,
      Minprice,
      Avgprice,
      location,
      date
    } = req.body

    // Validation

    if (
      !cropName ||
      !Maxprice ||
      !Minprice ||
      !Avgprice ||
      !location ||
      !date
    ) {

      return res.status(400)
        .json({

          success: false,

          message:
            "Please provide all fields"

        })

    }

    // Demo admin

    admin: {

  name: "Admin"

}

    // Create crop

    const newCrop = new Crop({

      cropName,

      Maxprice:
        Number.parseFloat(
          Maxprice
        ),

      Minprice:
        Number.parseFloat(
          Minprice
        ),

      Avgprice:
        Number.parseFloat(
          Avgprice
        ),

      location,

      date: new Date(date),

      admin: {

        name: user.name,

        id: user._id

      }

    })

    // Save

    const crop =
      await newCrop.save()

    res.status(201).json({

      success: true,

      message:
        "Crop rate added successfully",

      data: crop

    })

  } catch (err) {

    console.error(err)

    res.status(500).json({

      success: false,

      message:
        "Failed to add crop"

    })

  }

})

// ==============================
// DELETE CROP
// ==============================

router.delete("/:id", async (req, res) => {

  try {

    const crop =
      await Crop.findById(
        req.params.id
      )

    if (!crop) {

      return res.status(404)
        .json({

          success: false,

          message:
            "Crop not found"

        })

    }

    await crop.deleteOne()

    res.json({

      success: true,

      message:
        "Crop deleted"

    })

  } catch (err) {

    console.error(err)

    res.status(500).json({

      success: false,

      message:
        "Failed to delete crop"

    })

  }

})

module.exports = router