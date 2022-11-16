const { connectDatabase } = require("../database/connectDB.js");
const { faker } = require('@faker-js/faker');
const crypto = require('crypto');
const blogModel = require("../database/blog.model.js");
const userModel = require("../database/user.model.js");

async function createDummyUsers(count) {
    await connectDatabase()

    // create 500 dummy users

    const users = []

    for (let i = 0; i < count; i++) {
        const user = {
            name: faker.name.fullName(),
            image: faker.image.avatar(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
            gender: ['Male', 'Female', 'Other'][crypto.randomInt(0, 3)]
        }

        users.push(user);
    }

    console.log(users)
    await userModel.insertMany(users);
}

async function createDummyBlogs(count) {
    await connectDatabase()
    console.log('Count', count)
    const users = await userModel.find();

    console.log(users.length)
    let blogs = [];

    for (let i = 0; i < count; i++) {
        const author = users[crypto.randomInt(0, users.length)];

        let blog = {
            content: faker.lorem.paragraph(),
            title: faker.hacker.phrase(),
            author: {
                authorId: author._id,
                authorName: author.name,
                authorImage: author.image
            }
        }

        blogs.push(blog);
    }

    await blogModel.insertMany(blogs);
    console.log('Done');
}

// createDummyUsers(500).then(() => createDummyBlogs(5000));