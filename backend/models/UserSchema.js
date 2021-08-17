const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  room_id: {
    type: Array,
    required: true,
  },
  conversation_id: {
    type: Array,
    required: true,
  },
  permession_id: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
