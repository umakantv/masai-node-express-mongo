const { PostModel } = require("../db/post");
const { UserModel } = require("../db/user");

async function findPaginated({
    page = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = ''
}) {

    const totalPosts = await PostModel.count({
        title: {
            $regex: search
        }
    });

    const posts = await PostModel.find({
        title: {
            $regex: search
        }
    })
    .sort({
        [sortBy]: sortOrder == 'asc' ? 1 : -1
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

    return {
        totalPosts,
        posts
    }
}

async function findById(id) {
    return PostModel.findById(id);
}

async function createPost(userId, postData) {

    const user = await UserModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    const post = await PostModel.create({
        title: postData.title,
        titleImage: postData.titleImage,
        content: postData.content,
        author: {
            _id: user._id,
            name: user.name,
            image: user.image
        }
    })

    // Increment the user's postCount by 1
    await UserModel.findByIdAndUpdate(user._id, {
        $inc: {
            postCount: 1
        }
    })

    return post;
}

async function updatePost(userId, postId, postData) {
    
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    let post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post does not exist');
    }

    if (String(post.author._id) !== String(user._id)) {
        throw new Error('User ca\'t edit the post')
    }

    post.update({
        $set: {
            title: postData.title,
            content: postData.content,
        }
    })

    post = await PostModel.findById(postId);

    return post;
}

async function deletePost(userId, postId) {
        
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    let post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post does not exist');
    }

    if (String(post.author._id) !== String(user._id)) {
        throw new Error('User ca\'t delete the post')
    }

    post = await PostModel.findByIdAndDelete(postId)

    return post;
}

module.exports = {
    findById,
    findPaginated,
    createPost,
    updatePost,
    deletePost
}