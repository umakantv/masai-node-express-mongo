
const { faker } = require('@faker-js/faker');
const connectDatabase = require('../db/connectDatabase');
const User = require('../db/User.model');
const Post = require('../db/Post.model');
const crypto = require('crypto');

async function createFakePosts(count = 100) {

    const users = await User.find();

    let posts = [];

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];
        
        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(6),
            author: {
                userId: String(user._id),
                name: user.name,
                image: user.image,
            }
        }

        posts.push(post);
    }

    await Post.create(posts);

    console.log(count, 'Posts added')
}

connectDatabase()
.then(() => createFakePosts(1000))