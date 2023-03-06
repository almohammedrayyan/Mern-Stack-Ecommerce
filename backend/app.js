const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookie = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/.env" });
app.use(express.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

//Route Imports

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
//Middleware for error
app.use(errorMiddleware);
module.exports = app;
