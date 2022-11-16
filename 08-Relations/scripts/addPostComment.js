import connectDatabbase from "../database/index.js";
import postModel from "../database/post.js";
import userModel from "../database/user.js";
import {faker} from '@faker-js/faker';
import crypto from 'crypto';
import commentModel from "../database/comment.js";

connectDatabbase().then(test)

async function test() {

    let users = await userModel.find();  // 100
    let posts = await postModel.find();  // 1000

    let comments = [];

    for (let i = 0; i < 10000; i++) {

        let post = posts[crypto.randomInt(0, posts.length)];
        let user = users[crypto.randomInt(0, users.length)];

        let comment = {
            content: faker.hacker.phrase(),
            post: post._id, // normalized approach
            user: { // denormalized approach
                _id: user._id,
                name: user.name,
                image: user.image,
            },
        }

        comments.push(comment);
    }

    console.log(new Date(), 'Comments started to add');

    await commentModel.insertMany(comments)

    console.log(new Date(), 'Comments added');

}