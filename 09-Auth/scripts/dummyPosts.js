const crypto = require('crypto');
const {faker} = require('@faker-js/faker')
const connectDatabase = require("../db/connectDatabase");
const User = require("../db/user.model");
const Post = require('../db/post.model');

async function createPosts(count) {
    // User

    const users = await User.find();

    const posts = [];

    for(let i = 0; i < count; i++) {

        const author = users[crypto.randomInt(0, users.length)];

        posts.push({
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(crypto.randomInt(7, 13)),
            author: {
                userId: author._id,
                name: author.name,
                image: author.image
            }
        })
    }

    await Post.create(posts);

    console.log('Posts added.')
}

connectDatabase()
.then(() => {
    createPosts(2500);
})