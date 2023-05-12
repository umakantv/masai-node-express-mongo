import PostModel from "../db/Post.model.js";

export async function addPost(post, user) {
    let addedPost = await PostModel.create({
        title: post.title,
        content: post.content,
        author: {
            userId: user._id,
            name: user.name,
            iamge: user.image,
        }
    })

    return addedPost;
}

export async function getPostById(id) {
    return PostModel.findById(id);
}

export async function getPosts({
    page = 1, pageSize = 5, search = ""
}) {

    let totalPosts = await PostModel.countDocuments({
        title: {
            $regex: search
        }
    })

    let posts = await PostModel.find({
        title: {
            $regex: search
        }
    }).limit(pageSize).skip((page - 1) * pageSize)

    return {
        totalPosts, posts
    }
}