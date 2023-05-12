import connectDatabase from "../db/connectDatabase.js";
import { faker } from '@faker-js/faker'
import crypto from 'crypto'
import UserModel from "../db/User.model.js";
import PostModel from "../db/Post.model.js";
import CommentModel from "../db/Comment.model.js";

async function addFakeComments(count) {

    const comments = [];

    const users = await UserModel.find();
    const posts = await PostModel.find();

    for (let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];
        const post = posts[crypto.randomInt(0, posts.length)];

        const comment = {
            comment: faker.lorem.paragraphs(crypto.randomInt(5, 11)),
            author: {
                userId: user._id,
                name: user.name,
                image: user.image,
            },
            postId: post._id,
        }

        comments.push(comment);
    }

    await CommentModel.create(comments);

    console.log('Added comments');

}

connectDatabase()
.then(() => addFakeComments(9000));