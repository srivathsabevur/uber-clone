const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted)
      return res.status(401).json({ message: "Unauthorized access" });

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain)
      return res.status(401).json({ message: "Unauthorized access" });
    req.captain = captain;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};
