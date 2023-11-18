const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 30,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isProfileImg: {
        type: Boolean,
        default: false,
    },
    profileImg: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("users", userSchema); 