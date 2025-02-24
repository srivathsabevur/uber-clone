const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectTodb = require("./db/db");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.route");
const mapRoutes = require("./routes/map.route");
const rideRoutes = require("./routes/ride.route");

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

connectTodb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
