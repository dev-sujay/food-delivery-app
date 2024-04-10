const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    userType: {
        type: String,
        required: true,
        enums: ["admin", "user", "deliveryAgent"],
        default: "user"
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/564x/40/25/ab/4025abd53db682406ae17b9d7c1e4f54.jpg"
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);