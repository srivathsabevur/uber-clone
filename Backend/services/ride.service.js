const mapService = require("../services/maps.service");
const rideModel = require("../models/ride.model");
const crypto = require("crypto");
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const distance = distanceTime.distance.value / 1000;
  const time = distanceTime.duration.value / 60;

  // Define fare rates per kilometer and per minute for each vehicle type
  const fareRates = {
    car: { perKm: 10, perMin: 2 },
    auto: { perKm: 8, perMin: 1.5 },
    moto: { perKm: 5, perMin: 1 },
  };

  // Calculate fare for each vehicle type
  const fares = {
    car: Math.round(
      distance * fareRates.car.perKm + time * fareRates.car.perMin
    ),
    auto: Math.round(
      distance * fareRates.auto.perKm + time * fareRates.auto.perMin
    ),
    moto: Math.round(
      distance * fareRates.moto.perKm + time * fareRates.moto.perMin
    ),
  };

  return fares;
}

module.exports.getFare = getFare;

const getOtp = (num) => {
  const buffer = crypto.randomBytes(3); // Generate 3 random bytes
  const hexString = buffer.toString("hex"); // Convert to hex string
  const decimalString = parseInt(hexString, 16).toString(); // Convert hex to decimal and then to string
  const otp = decimalString.slice(0, num); // Take the first 'num' characters
  return otp;
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, Pickup, Destination and Vehicle Type are required");
  }
  const fares = await getFare(pickup, destination);
  const fare = fares[vehicleType];
  const ride = await rideModel.create({
    user: user,
    pickup: pickup,
    destination: destination,
    otp: getOtp(6),
    fare: fare,
  });
  return ride;
};

module.exports.confirmRide = async (rideId, captianId) => {
  if (!rideId || !captianId) {
    throw new Error("Id is required");
  }
  try {
    await rideModel.findByIdAndUpdate(rideId, {
      captain: captianId,
    });
    const ride = await rideModel
      .findById(rideId)
      .populate("captain")
      .populate("user")
      .select("+otp");
    ride.status = "accepted";
    await ride.save();
    return ride;
  } catch (error) {
    throw error;
  }
};

module.exports.startRide = async (rideId, otp, captainId) => {
  if (!rideId || !otp || !captainId) {
    throw new Error("Id is required");
  }
  try {
    const ride = await rideModel
      .findById(rideId)
      .populate("captain")
      .populate("user")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }
    if (ride.status !== "accepted") {
      throw new Error("Ride not accepted");
    }
    if (ride.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    ride.status = "ongoing";
    await ride.save();

    return ride;
  } catch (error) {
    throw error;
  }
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
