const Post = require("../db/post.model")

async function getPostById(id) {
    return Post.findById(id);
}

async function getAllPosts({
    page, pageSize, search, sortBy, sortOrder
}) {

    let searchOptions = {}

    if (search) {
        searchOptions = {
            $text: {
                $search: search
            }
        };
    }

    console.log(searchOptions, sortBy)

    const posts = await Post.find(searchOptions)
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({
        [sortBy]: sortOrder == 'asc' ? 1: -1
    });

    const postCount = await Post.countDocuments(searchOptions);

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

async function deletePostById(id, user) {

    const post = await Post.findByIdAndDelete(id);

    return post;
}

module.exports = {
    getPostById,
    getAllPosts,
    addPost,
    updatePostById,
    deletePostById,
}