const mapServices = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapServices.getAddress(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Co-ordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const distance = await mapServices.getDistanceTime(origin, destination);
    return res.status(200).json(distance);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Distance not found" });
  }
};

module.exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const suggestions = await mapServices.getAutoCompleteSuggestions(input);
    return res.status(200).json(suggestions);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Suggestions not found" });
  }
};
