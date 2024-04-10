const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { userName, password, email, phone, userType } = req.body
        if (!userName || !password || !email || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }
        const userExists = await User.findOne({email, userName})
        console.log(userExists)
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPw = await  bcrypt.hash(password, salt)
        const newUser =await  User.create({
            ...req.body,
            password: hashedPw
        })
        return res.status(201).send({
            success: true,
            message: "User created successfully",
            data : newUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET)
        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            accessToken : token
        })
    } catch (error) {
       return res.status(500).send({
           success: false,
           message: error.message
       }) 
    }
}


module.exports = { register, login }
