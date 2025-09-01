const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String, unique: true, required: true,},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', },
            quantity: { type: Number, required: true, min: 1, },
            size: {type: String},
            color: { type: String},
            totalPrice: { type: Number}
        }
    ],
    platformFee: { type: Number, default: 5, },
    totalAmount: { type: Number, },
    createdAt: { type: Date, default: Date.now, }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);