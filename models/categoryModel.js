const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://i.pinimg.com/564x/40/25/ab/4025abd53db682406ae17b9d7c1e4f54.jpg",
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Category', categorySchema);