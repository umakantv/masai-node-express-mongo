const crypto = require('crypto');
const {faker} = require('@faker-js/faker')
const connectDatabase = require("../db/connectDatabase");
const User = require("../db/user.model");
const Post = require('../db/post.model');
const Comment = require('../db/comment.model');

async function createPosts(count) {
    // User

    const users = await User.find();
    const posts = await Post.find();

    const comments = [];

    for(let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];
        const post = posts[crypto.randomInt(0, posts.length)];

        comments.push({
            content: faker.lorem.sentences(crypto.randomInt(2, 6)),
            user: {
                userId: user._id,
                name: user.name,
                image: user.image
            },
            post: {
                postId: post._id,
                title: post.title
            }
        })
    }

    await Comment.create(comments);

    console.log('Comments added.')
}

connectDatabase()
.then(() => {
    createPosts(10000);
})