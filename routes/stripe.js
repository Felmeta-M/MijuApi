const router = require("express").Router();


router.post("/payment", async (req, res) => {
    const stripe = require("stripe")(process.env.STRIPE_KEY);
    await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send(stripeErr)
        } else {
            res.status(200).send(stripeRes)
        }
    })
})

module.exports = router;