const Post = require('../database/post')
const Comment = require('../database/comment')

async function getAllPosts(req, res, next) {
    const {skip, limit} = req.query;

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
    let { post } = req.body;
    const { user } = req.context

    if (!user) {
        return res.status(401).send({
            error: "Login to create a post"
        })
    }

    post.user = user._id;

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
    const { user } = req.context

    if (!user) {
        return res.status(401).send({
            error: "Login to delete your post"
        })
    }

    const post = await Post.findById(id)

    if (post.user.toString() !== user._id.toString()) {
        return res.status(401).send({
            error: "This post does not belong to you. You can not delete this post."
        })
    }

    await Post.findByIdAndDelete(id);

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