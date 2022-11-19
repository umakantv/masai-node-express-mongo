const mongoose = require("mongoose")

/**
 * Looking at the Cardinality for set {follower, following}
 * 
 * A User can easily have millions of followers.
 * But it is very difficult to follow a million people.
 */
const followerSchema = new mongoose.Schema({
    follower: {
        _id: String,
        name: String,
        iamge: String,
    },
    following: {
        _id: String,
        name: String,
        iamge: String,
    },
}, {
    timestamps: true
})

const followerModel = mongoose.model('followers', followerSchema)

module.exports = followerModel;