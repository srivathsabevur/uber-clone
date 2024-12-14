const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // 24 hours in seconds
  },
});

const BlacklistToken = mongoose.model("blacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
