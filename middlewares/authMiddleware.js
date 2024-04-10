const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        const user = await JWT.verify(token.split(" ")[1], process.env.JWT_SECRET)
        if (!user.id) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        next()
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}