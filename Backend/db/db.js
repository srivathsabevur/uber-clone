const mongoose = require("mongoose");

function connectTodb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {});
}
module.exports = connectTodb;
