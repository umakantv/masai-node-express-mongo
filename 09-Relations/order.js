const mongoose = require("mongoose");

const schema = new mongoose.Schema({

    // Approach 1 - Denormalized approach
    // user: {
    //     _id: ObjectId('6304fa3f71c2312c00c35d18'),
    //     name: String,
    //     email: String,
    //     image: String,
    //     phone: String,
    // },

    // Approach 2 - Normalized Approach
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    product: { // history - we do not update details here even if the product is updated
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        uom: String,
    },

    amount: Number, // total amount = qty * product.price
    quantity: Number, // number of units of the product ordered
    address: { // user does not update address ofter
        house: String,
        city: String,
        zipCode: String,
        country: String,
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', schema);

module.exports = Order;