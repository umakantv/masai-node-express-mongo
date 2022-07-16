const Post = require('../database/post')
const Comment = require('../database/comment')

async function getAllPosts(req, res, next) {
    const {skip, limit} = req.query;

    console.log(req.query)

    const posts = await Post.find().skip(skip).limit(limit).populate('user');

    return res.send({
        data: posts
    })
}

async function getSinglePost(req, res, next) {
    const {id} = req.params;

    let post = await Post.findById(id).populate('user');

    if (!post) {
        return res.status(404).send({
            error: "Post was not found."
        })
    }

    post = post.toJSON();
    
    const comments = await Comment.find({
        post: {
            id: post._id
        }
    })
    post.comments = comments;

    return res.send({
        data: post
    })
}

async function createPost(req, res, next) {
    let {post} = req.body;

    post = await Post.create(post);

    return res.send({
        data: post
    })
}

async function updatePost(req, res, next) {
    let {id} = req.params;
    let {post: postData} = req.body;

    let post = await Post.findById(id);

    for (const [key, value] of Object.entries(postData)) {
        post[key] = value;
    }

    await post.save();

    return res.send({
        data: post
    })
}

async function deletePost(req, res, next) {
    let {id} = req.params;

    await Post.findByIdAndRemove(id);

    return res.send({
        message: "Post has been deleted."
    })

}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
}