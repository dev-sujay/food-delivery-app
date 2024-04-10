const FoodItem = require('../models/foodItemModel')
const mongoose = require('mongoose')

const addFoodItem = async (req, res) => {
    try {
        const { name, price, category } = req.body
        if (!name || !price || !category) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            throw new Error('Please provide a valid category');
        }
        const newFoodItem = await FoodItem.create({
            ...req.body
        })
        return res.status(201).send({
            success: true,
            message: "Food item created successfully",
            data: newFoodItem
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getFoodItems = async (req, res) => {
    try {
        if (req.query.category) {
            const foodItems = await FoodItem.find({ category: req.query.category })
            return res.status(200).send({
                success: true,
                data: foodItems
            })
        }
        if (req.query.isNonVeg) {
            const foodItems = await FoodItem.find({ isNonVeg: req.query.isNonVeg })
            return res.status(200).send({
                success: true,
                data: foodItems
            })
        }
        if (req.query.isAvailable) {
            const foodItems = await FoodItem.find({ isAvailable: req.query.isAvailable })
            return res.status(200).send({
                success: true,
                data: foodItems
            })
        }
        if (req.query.price) {
            const foodItems = await FoodItem.find({ price: req.query.price })
            return res.status(200).send({
                success: true,
                data: foodItems
            })
        }
        if (req.query.name) {
            const foodItems = await FoodItem.find({ name: req.query.name })
            return res.status(200).send({
                success: true,
                data: foodItems
            })
        }
        if (req.query.id) {
            const foodItem = await FoodItem.findById(req.query.id)
            if (!foodItem) {
                return res.status(404).send({
                    success: false,
                    message: "Food item not found"
                })
            }
            return res.status(200).send({
                success: true,
                data: foodItem
            })
        }
        const foodItems = await FoodItem.find()
        return res.status(200).send({
            success: true,
            data: foodItems
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const updateFoodItem = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send({
                success: false,
                message: "Please provide food item id"
            })
        }
        const foodItem = await FoodItem.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        })
        return res.status(200).send({
            success: true,
            data: foodItem
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteFoodItem = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send({
                success: false,
                message: "Please provide food item id"
            })
        }
        await FoodItem.findByIdAndDelete(req.query.id)
        return res.status(200).send({
            success: true,
            message: "Food item deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addFoodItem,
    getFoodItems,
    updateFoodItem,
    deleteFoodItem
}