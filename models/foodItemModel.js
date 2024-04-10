const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isNonVeg: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        default: "0%"
    },
    weight: {
        type: String,
    },
    noOfItems: {
        type: Number,
        required: true,
        default: 1
    },
    image: {
        type: String,
        default: "https://i.pinimg.com/564x/40/25/ab/4025abd53db682406ae17b9d7c1e4f54.jpg"
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('FoodItem', foodItemSchema);