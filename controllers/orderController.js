const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { orderItems } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        }
        const newOrder = await Order.create({
            ...req.body
        });
        res.status(201).send({
            success: true,
            data: newOrder
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const getOrders = async (req, res) => {
    try {
        if (req.query.id) {
            const order = await Order.findById(req.query.id);
            if(!order) {
               return res.status(404).send({
                    success: false,
                    message: 'Order not found'
                });
            }
            res.status(200).send({
                success: true,
                data: order
            });
        }
        const orders = await Order.find();
        res.status(200).send({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        }); 
    }
};

const cancelOrder = async (req, res) => {
    try {
        if (!req.query.id) {
            res.status(400);
            throw new Error('Please provide order id');
        }
        const order = await Order.findByIdAndUpdate(req.query.id, {
            isCancelled: true,
            cancelledAt: Date.now()
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).send({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const returnOrder = async (req, res) => {
    try {
        if (!req.query.id) {
            res.status(400);
            throw new Error('Please provide order id');
        }
        const order = await Order.findByIdAndUpdate(req.query.id, {
            isReturned: true,
            returnApprovedAt: Date.now()
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).send({
            success: true,
            message: 'Order returned successfully',
            data: order
        });
    }catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        if (!req.query.id) {
            res.status(400);
            throw new Error('Please provide order id');
        }
        const order = await Order.findByIdAndUpdate
        (req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).send({
            success: true,
            message: 'Order updated successfully',
            data: order
        });
    }catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createOrder,
    getOrders,
    cancelOrder,
    updateOrder,
    returnOrder
};