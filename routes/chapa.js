const router = require("express").Router();
const axios = require("axios");

router.post("/accept-payment", async (req, res) => {
  const { amount, currency, email, first_name, last_name, phone_number, tx_ref } = req.body;

  try {
    const headers = {
      Authorization: `Bearer ${process.env.CHAPA_KEY}`,
      "Content-Type": "application/json",
    };

    const body = {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      // return_url: "http://localhost:5173/", 
    };

    const response = await axios.post("https://api.chapa.co/v1/transaction/initialize", body, { headers });
    res.status(200).json(response.data);

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || error.message,
    });
  }
});

module.exports = router;