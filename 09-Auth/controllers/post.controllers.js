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