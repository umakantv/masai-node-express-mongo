
const { faker } = require('@faker-js/faker');
const connectDatabase = require('../db/connectDatabase');
const User = require('../db/User.model');
const Post = require('../db/Post.model');
const Comment = require('../db/Comment.model');
const crypto = require('crypto');

async function createFakeComments(count = 100) {

    const users = await User.find();
    const posts = await Post.find();

    let comments = [];

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];
        const post = posts[crypto.randomInt(0, posts.length)];

        const comment = {
            content: faker.lorem.paragraphs(6),
            user: {
                userId: String(user._id),
                name: user.name,
                image: user.image,
            },
            post: {
                postId: String(post._id),
                title: post.title,
            }
        }

        comments.push(comment);
    }

    await Comment.create(comments);

    console.log(count, 'Comments added')
}

connectDatabase()
.then(() => createFakeComments(5000))