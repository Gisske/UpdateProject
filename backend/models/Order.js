const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    idstudent: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    items: [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
    }, ],
    orderDate: { type: Date, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);