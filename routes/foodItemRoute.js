const express = require('express')
const { addFoodItem, getFoodItems, updateFoodItem, deleteFoodItem } = require('../controllers/foodItemController')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').post(isAdminMiddleware, addFoodItem)
router.route('/').get(authMiddleware, getFoodItems)
router.route('/').patch(isAdminMiddleware, updateFoodItem)
router.route('/').delete(isAdminMiddleware, deleteFoodItem)

module.exports = router

