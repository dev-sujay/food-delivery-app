const express = require('express')
const { getOrders, updateOrder, cancelOrder, returnOrder, createOrder } = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(authMiddleware, getOrders)
router.route('/').patch(authMiddleware, updateOrder)
router.route('/cancel').patch(authMiddleware, cancelOrder)
router.route('/return').patch(authMiddleware, returnOrder)
router.route('/').post(authMiddleware, createOrder)

module.exports = router

