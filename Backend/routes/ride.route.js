const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location is required"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "moto"])
    .withMessage("Vehicle type is required"),
  authMiddleware.authUser,
  rideController.createRide
);

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location is required"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  authMiddleware.authUser,
  rideController.getFare
);

router.post(
  "/confirm-ride",
  body("rideId")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Ride Id is required"),
  authMiddleware.authCaptain,
  rideController.confirmRide
);

router.get(
  "/start-ride",
  query("rideId").isMongoId().withMessage("Ride Id is required"),
  query("otp").isString().isLength({ min: 6 }).withMessage("OTP is required"),
  authMiddleware.authCaptain,
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.endRide
);

module.exports = router;
