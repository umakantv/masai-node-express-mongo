const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    phone: String,
    addresses: [{
        house: String,
        city: String,
        zipCode: String,
        country: String,
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', schema);

module.exports = User;