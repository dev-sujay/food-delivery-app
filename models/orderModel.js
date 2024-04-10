const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [
       {
         foodItemId : { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
         qty : { type: Number, required: true },
       }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    shippingPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    userId: {
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date },
    deliveryTime: { type: String },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    cancellationRequested : { type: Boolean, default: false },
    cancellationRequestedAt: { type: Date },
    cancellationRejectedAt: { type: Date },
    cancellationRejectedReason: { type: String },
    cancellationApprovedAt: { type: Date },
    cancellationReason: { type: String },
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date },
    returnRequested : { type: Boolean, default: false },
    returnRequestedAt: { type: Date },
    returnReason: { type: String },
    isReturnApproved: { type: Boolean, default: false },
    isReturned: { type: Boolean, default: false },
    returnApprovedAt: { type: Date },
    returnRejectedAt: { type: Date },
    returnRejectedReason: { type: String },
    isRefunded: { type: Boolean, default: false },
    refundedAt: { type: Date },
    refundAmount: { type: Number },
    refundReason: { type: String },
    refundRejectedAt: { type: Date },
    refundRejectedReason: { type: String },
    refundApprovedAt: { type: Date }
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);