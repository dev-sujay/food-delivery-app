const express = require('express')
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').post(isAdminMiddleware, addCategory)
router.route('/').get(authMiddleware, getCategories)
router.route('/').patch(isAdminMiddleware, updateCategory)
router.route('/').delete(isAdminMiddleware, deleteCategory)

module.exports = router

