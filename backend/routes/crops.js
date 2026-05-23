const express = require("express")

const router = express.Router()

const Crop = require("../models/Crop")

// ======================================
// GET ALL CROPS
// ======================================

router.get("/", async (req, res) => {

  try {

    const crops =
      await Crop.find()
        .sort({ date: -1 })

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

// ======================================
// ADD NEW CROP
// ======================================

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

      return res.status(400).json({

        success: false,

        message: "Please fill all fields"

      })

    }

    // Create Crop

    const newCrop = new Crop({

      cropName,

      Maxprice:
        parseFloat(Maxprice),

      Minprice:
        parseFloat(Minprice),

      Avgprice:
        parseFloat(Avgprice),

      location,

      date: new Date(date),

      admin: {

        name: "Admin"

      }

    })

    // Save

    const savedCrop =
      await newCrop.save()

    res.status(201).json({

      success: true,

      message:
        "Crop added successfully",

      data: savedCrop

    })

  } catch (err) {

    console.error(
      "Crop Save Error:",
      err
    )

    res.status(500).json({

      success: false,

      message:
        "Failed to add crop"

    })

  }

})

// ======================================
// DELETE CROP
// ======================================

router.delete("/:id", async (req, res) => {

  try {

    const crop =
      await Crop.findById(
        req.params.id
      )

    if (!crop) {

      return res.status(404).json({

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
        "Delete failed"

    })

  }

})

module.exports = router