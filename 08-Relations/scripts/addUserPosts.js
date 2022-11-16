import connectDatabbase from "../database/index.js";
import postModel from "../database/post.js";
import userModel from "../database/user.js";
import {faker} from '@faker-js/faker';
import crypto from 'crypto';

connectDatabbase().then(test)

async function test() {

    let users = [];

    for (let i = 0; i < 100; i++) {
        const user = {
            name: faker.name.fullName(),
            password: crypto.randomInt(3400, 540000000),
            email: faker.internet.email(),
            dob: faker.date.birthdate(),
            image: faker.image.avatar(),
            about: faker.hacker.phrase(),
            verifiedEmail: true,
            followerCount: crypto.randomInt(0, 1000),
        }

        users.push(user);
    }

    await userModel.insertMany(users);

    users = await userModel.find();

    let posts = []

    for (let i = 0; i < 1000; i++) {

        let user = users[crypto.randomInt(0, users.length)];

        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.lines(crypto.randomInt(10, 30)),
            likedCount: crypto.randomInt(0, 35),
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                about: user.about,
                followerCount: user.followerCount,
            }
        }

        posts.push(post);
    }

    await postModel.insertMany(posts);

}