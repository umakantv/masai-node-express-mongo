const mongoose = require("mongoose");
const user = require("./user");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 10,
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;