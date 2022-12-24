
const {faker} = require('@faker-js/faker')
const crypto = require('crypto');
const { CommentModel } = require('../db/comment');
const connect = require('../db/connect');
const { PostModel } = require('../db/post');
const { UserModel } = require('../db/user');

connect()
.then(async () => {
    const count = 3000;

    const users = await UserModel.find();
    const posts = await PostModel.find();

    const comments = []

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(users.length)];
        const post = posts[crypto.randomInt(posts.length)];

        const comment = {
            content: faker.lorem.paragraphs(1 + crypto.randomInt(3)),
            author: {
                _id: user._id,
                name: user.name,
                image: user.image
            },
            post: {
                _id: post._id,
                title: post.title
            }
        }

        comments.push(comment);
    }

    await CommentModel.insertMany(comments);
    console.log('Added comments')
})