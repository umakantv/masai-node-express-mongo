
const {faker} = require('@faker-js/faker')
const crypto = require('crypto')
const connect = require('../db/connect');
const { PostModel } = require('../db/post');
const { UserModel } = require('../db/user');

connect()
.then(async () => {
    const count = 1000;

    const users = await UserModel.find();

    const posts = []

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(users.length)];

        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(10),
            titleImage: faker.image.city(800, 400),
            author: {
                _id: user._id,
                name: user.name,
                image: user.image
            }
        }

        posts.push(post);
    }

    await PostModel.insertMany(posts);
    console.log('Added posts')
})