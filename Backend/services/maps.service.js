const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddress = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { lat, lng } = response.data.results[0].geometry.location;
    return { ltd: lat, lng: lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination)
    throw new Error("Please provide both origin and destination");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
      throw new Error("No route found between the origin and destination");
    }
    return response.data.rows[0].elements[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) throw new Error("Please provide a valid input");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("No suggestions found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
  //radius in km
  console.log(ltd, lng, radius);

  const captains = captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
