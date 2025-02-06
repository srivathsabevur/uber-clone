const captainModel = require("../models/captain.model");
module.exports.createCaptain = async function ({
  firstname,
  lastname,
  email,
  password,
  color,
  vehicleType,
  plate,
  capacity,
}) {
  const captain = new captainModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      vehicleType,
      plate,
      capacity,
    },
  });
  return await captain.save();
};
