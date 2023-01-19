
const {faker} = require('@faker-js/faker')
const connectDatabase = require('../database/connectDatabase');
const { User } = require('../database/User');
const { Post } = require('../database/Post');
const { Comment } = require('../database/Comment');
const crypto = require('crypto');

const genders = ['male', 'female', 'other'];

async function generateFakeUserData(count = 500) {

    const users = [];

    for(let i = 0; i < count; i++) {

        const gender = genders[crypto.randomInt(0, 3)];

        const user = {
            name: faker.name.fullName({
                gender: gender
            }),
            gender: gender,
            email: faker.internet.email(),
            image: faker.internet.avatar(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        }

        users.push(user);
    }

    User.insertMany(users);

}

async function generateFakePostData(count = 3000) {
    
    const users = await User.find();
    const posts = [];

    for (let i = 0; i < count; i++) {
        const user = users[crypto.randomInt(0, users.length)];

        const post = {
            title: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(crypto.randomInt(5, 10)),
            author: {
                userId: user._id,
                name: user.name,
                image: user.image,
            }
        }

        posts.push(post);
    }

    await Post.insertMany(posts);

    console.log('Added all posts')

}

async function generateFakeCommentData(count = 30000) {
    const users = await User.find();

    const posts = await Post.find(); // [1, 2, 3, 4]

    const comments = [];

    for(let i = 0; i < count; i++) {

        const user = users[crypto.randomInt(0, users.length)];
        const post = posts[crypto.randomInt(0, posts.length)]; // [0, 3]

        const comment = {
            content: faker.lorem.paragraph(),
            user: {
                userId: user._id,
                name: user.name,
                image: user.image,
            },
            post: {
                postId: post._id,
                title: post.title
            }
        }
        
        comments.push(comment);
    }

    await Comment.insertMany(comments);

    console.log('Added data for comments')
}

connectDatabase()
.then(() => generateFakePostData(500000))
