const Post = require("../db/Post.model");
const User = require("../db/User.model");

async function fetchPosts({
    page, count, search
}) {

    const totalPosts = await Post.countDocuments({
        title: {
            $regex: `${search}`
        }
    });

    const skip = (page - 1) * count; // count = 10, page = 4, skip = 30

    const posts = await Post.find({
        title: {
            $regex: `${search}`
        }
    }).limit(count).skip(skip);

    return {
        posts,
        totalPosts
    }
}

async function addPost({
    title, content, userId
}) {

    const user = await User.findById(userId);

    if (user) {

        const post = await Post.create({
            title, content,
            author: {
                userId,
                name: user.name,
                image: user.image,
            }
        })

        return post;

    } else {
        throw new Error('User does not exist');
    }
}

async function getPost(id) {
    const post = await Post.findById(id);

    if (!post) {
        throw new Error('Post does not exist')
    }

    return post;
}

module.exports = {
    fetchPosts,
    addPost,
    getPost
}