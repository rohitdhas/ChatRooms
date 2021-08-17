const mongoose = require('mongoose');

const Room = new mongoose.Schema({
    messages: Array,
    users_id: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    } 
})

module.exports = mongoose.model("Room", Room);