const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

module.exports.initializeSocketServer = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`Client Connected ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        const captain = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return new Error("Invalid location");
      }

      const captain = await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports.sendMessage = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  }
};
