const express = require('express')
const { getUser, updateUser, deleteUser, changePassword } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(authMiddleware, getUser)
router.route('/').patch(authMiddleware, updateUser)
router.route('/').delete(authMiddleware, deleteUser)
router.route('/changePassword').patch(authMiddleware, changePassword)

module.exports = router

