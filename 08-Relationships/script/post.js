import connectDatabase from "../db/connectDatabase.js";
import { faker } from '@faker-js/faker'
import crypto from 'crypto'
import UserModel from "../db/User.model.js";
import PostModel from "../db/Post.model.js";

async function addFakePosts(count) {

    const posts = [];

    const users = await UserModel.find();

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];

        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(crypto.randomInt(5, 11)),
            author: {
                userId: user._id,
                name: user.name,
                image: user.image,
            }
        }

        posts.push(post);
    }

    await PostModel.create(posts);

    console.log('Added posts');

}

connectDatabase()
.then(() => addFakePosts(3000));