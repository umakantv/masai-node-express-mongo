require('dotenv').config()
const { faker } = require('@faker-js/faker')
const connectDatabase = require('../../database')
const User = require('../../database/user')
const Post = require('../../database/post')

async function createFakePosts(count) {

    const users = await User.find();

    for (let i = 0; i < count; i++) {
        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraph(100),
            user: users[Math.floor(Math.random() * 53)]
        };

        await Post.create(post)

    }
}

connectDatabase().then(() => {
    createFakePosts(500);
})
