const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


const getUser = async (req, res) => {
    try {
        if(req.query.id){
            const user = await User.findById(req.query.id)
            if(!user) return res.status(404).send({
                success: false,
                message: "User not found"
            })
            return res.status(200).send({
                success: true,
                data: user
            })
        }
        const users = await User.find()
        return res.status(200).send({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        if(!req.query.id){
            return res.status(400).send({
                success: false,
                message: "Please provide user id"
            })
        }
        const user = await User.findByIdAndUpdate(req.query.id , req.body, {
            new: true,
            runValidators: true
        })
        return res.status(200).send({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        if(!req.query.id){
            return res.status(400).send({
                success: false,
                message: "Please provide user id"
            })
        }
        await User.findByIdAndDelete(req.query.id)
        return res.status(200).send({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const changePassword = async (req, res) => {
    try {
        if(!req.query.id){
            return res.status(400).send({
                success: false,
                message: "Please provide user id"
            })
        }
        const user = await User.findById(req.query.id)
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(400).send({
                success: false,
                message: "Please provide old password and new password"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid old password"
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPw = await bcrypt.hash(newPassword, salt)
        await User.findByIdAndUpdate( req.query.id, {
            password: hashedPw
        })
        return res.status(200).send({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getUser,
    updateUser,
    deleteUser,
    changePassword
}