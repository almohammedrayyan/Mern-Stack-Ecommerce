const catchError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(
  "sk_test_51MeZA1SJgCmDNBoxpXxyEXCqANN7vQxpkc9QPx6KWLiya8NQSSCuDaCKMd9mEvYlYOayNGBz3afUuUixxAiPeJ1p00Thc56VEw"
);

exports.processPayment = catchError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Crusion",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
exports.sendStripeApiKey = catchError(async (req, res, next) => {
  res
    .status(200)
    .json({
      stripeApiKey:
        "pk_test_51MeZA1SJgCmDNBoxTlq8mGqBsFvFSGDZdTUGoxz6sA8A3sBms0Ckol2CNtfDWFAK2POOequfQ7S8lqCJ27gq3qOU00YVtNWnqF",
    });
});
