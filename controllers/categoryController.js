const Category = require('../models/categoryModel')

const addCategory = async (req, res) => {
    try {
        const { name , image} = req.body
        if (!name || !image) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }
        const newCategory = await Category.create({
            ...req.body
        })
        return res.status(201).send({
            success: true,
            data: newCategory
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getCategories = async (req, res) => {
    try {
        if(req.query.id){
            const category = await Category.findById(req.query.id)
            return res.status(200).send({
                success: true,
                data: category
            })
        }
        const categories = await Category.find()
        return res.status(200).send({
            success: true,
            data: categories
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        if(!req.query.id){
            return res.status(400).send({
                success: false,
                message: "Please provide category id"
            })
        }
        const category = await Category.findByIdAndUpdate(req.query.id , req.body , {
            new: true,
            runValidators: true
        })
        return res.status(200).send({
            success: true,
            data: category
        })
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        if(!req.query.id){
            return res.status(400).send({
                success: false,
                message: "Please provide category id"
            })
        }
        await Category.findByIdAndDelete(req.query.id)
        return res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
}