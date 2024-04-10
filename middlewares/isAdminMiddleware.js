const { verifyToken } = require("../utils/utils")

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        const user =  verifyToken(token.split(' ')[1])
        if (!user.id) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        if (user.userType !== "admin") {
            return res.status(403).send({
                success: false,
                message: "Forbidden access"
            })
        }
        next()
    } catch (error) {
      return res.status(500).send({
            success: false,
            message: error.message
        })  
    }
}