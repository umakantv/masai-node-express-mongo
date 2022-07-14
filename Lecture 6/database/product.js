const mongoose = require("mongoose");

// Define schema
const productSchema = new mongoose.Schema({
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
})

// Create a model
const Product = mongoose.model('Product', productSchema);

// add middlewares right here.

module.exports = Product;