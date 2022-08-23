const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    quantity: Number, // qty in one unit of product
    uom: String,
}, {
    timestamps: true
})

const Product = mongoose.model('Product', schema);

module.exports = Product;