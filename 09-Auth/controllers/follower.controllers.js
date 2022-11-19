
const followerModel = require("../database/follower.model");
const userModel = require("../database/user.model");

async function follow(req, res) {
    const {user} = req;

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }

    const {followingId} = req.params;

    const followingUser = await userModel.findById(followingId);

    if (!followingUser) {
        return res.status(404).send({
            status: 'error',
            message: 'Following user does not exist'
        })
    }

    const alreadyFollow = await followerModel.findOne({
        'follower._id': user._id,
        'following._id': followingUser._id,
    })

    if (alreadyFollow) {
        return res.status(400).send({
            status: 'error',
            message: 'You already follow this user.'
        })
    }

    await followerModel.create({
        follower: {
            _id: user._id,
            name: user.name,
            image: user.image,
        },
        following: {
            _id: followingUser._id,
            name: followingUser.name,
            image: followingUser.image,
        },
    })

    await userModel.findByIdAndUpdate(followingUser._id, {
        $set: {
            followerCount: (followingUser.followerCount || 0) + 1
        }
    })

    await userModel.findByIdAndUpdate(user._id, {
        $set: {
            followingCount: (user.followingCount || 0) + 1
        }
    })

    return res.status(200).send({
        status: 'success',
        message: `You are now following ${followingUser.name}`
    })
}

async function unfollow(req, res) {
    const {user} = req;

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }

    const {followingId} = req.params;

    const followingUser = await userModel.findById(followingId);

    if (!followingUser) {
        return res.status(404).send({
            status: 'error',
            message: 'Following user does not exist'
        })
    }

    await followerModel.findOneAndDelete({
        'follower._id': user._id,
        'following._id': followingUser._id,
    })

    await userModel.findByIdAndUpdate(followingUser._id, {
        $set: {
            followerCount: (followingUser.followerCount || 0) - 1
        }
    })

    await userModel.findByIdAndUpdate(user._id, {
        $set: {
            followingCount: (user.followingCount || 0) - 1
        }
    })

    return res.status(200).send({
        status: 'success',
        message: `You are not following ${followingUser.name} anymore`
    })
}

async function followers(req, res) {
    const {userId} = req.params;

    const followers = await followerModel.find({
        'following._id': userId,
    })

    return res.status(200).send({
        status: 'success',
        data: followers
    })
}

async function following(req, res) {
    const {userId} = req.params;

    const following = await followerModel.find({
        'follower._id': userId,
    })

    return res.status(200).send({
        status: 'success',
        data: following
    })
}

module.exports = {
    follow,
    unfollow,
    followers,
    following,
}