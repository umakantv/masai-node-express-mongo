const mongoose = require("mongoose");
const user = require("./user");

const OrderSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
    product: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: String,
        packInfo: String
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