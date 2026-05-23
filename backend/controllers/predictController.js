const axios = require("axios");

const predictPrice = async (req, res) => {

  try {

    const response = await axios.post(
      "https://agroneo-ml.onrender.com/predict",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Prediction failed"
    });

  }

};

module.exports = predictPrice;