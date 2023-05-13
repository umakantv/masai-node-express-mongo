const Post = require("../db/post.model")

async function getAllPosts({
    page, pageSize, sortBy, sortByOrder
}) {

    const posts = await Post.find().limit(pageSize).skip((page - 1) * pageSize);

    const postCount = await Post.countDocuments();

    return {
        posts, 
        postCount
    };
}

async function addPost(data) {

    const post = await Post.create(data);

    return post;
}

async function updatePostById(id, data) {

}

async function deletePostById(id) {

    const post = await Post.findByIdAndDelete(id);

    return post;
}

module.exports = {
    getAllPosts,
    addPost,
    updatePostById,
    deletePostById,
}