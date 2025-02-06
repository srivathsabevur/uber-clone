const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isCaptainAlreadyExists = await captainModel.findOne({ email: email });
  if (isCaptainAlreadyExists) {
    return res.status(400).send({ message: "Captain already exists" });
  }
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
    color: vehicle.color,
    vehicleType: vehicle.vehicleType,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
  });

  const token = await captain.generateAuthToken();
  return res.status(201).send({ captain, token });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email: email });
  if (!captain) {
    return res.status(400).send({ message: "Captain not found" });
  }
  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid password" });
  }
  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  return res.status(200).send({ captain, token });
};

module.exports.getCaptainProfile = async (req, res) => {
  return res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token: token });
  res.clearCookie("token");
  return res.status(200).send({ message: "Logout successful" });
};
