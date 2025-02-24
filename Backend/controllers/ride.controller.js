const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const rideModel = require("../models/ride.model");
const { sendMessage } = require("../socket");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const postion = await mapService.getAddress(pickup);

    const captains = await mapService.getCaptainInTheRadius(
      postion.ltd,
      postion.lng,
      5000
    );
    const rideWithUser = await rideModel.findById(ride._id).populate("user");
    captains.map((captain) => {
      sendMessage(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);

    sendMessage(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    throw error;
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;

  try {
    const startRide = await rideService.startRide(rideId, otp, req.captain._id);

    sendMessage(startRide.user.socketId, {
      event: "start-ride",
      data: startRide,
    });
    return res.status(200).json(startRide);
  } catch (error) {
    throw error;
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    sendMessage(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  s;
};
