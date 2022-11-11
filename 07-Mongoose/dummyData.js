import { connectDatabase } from "./database/connectDB.js";
import userModel from "./database/user.model.js";
import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import blogModel from "./database/blog.model.js";

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

// createDummyUsers(500)

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

    // console.log(blogs);
    await blogModel.insertMany(blogs);
}

createDummyBlogs(5000);