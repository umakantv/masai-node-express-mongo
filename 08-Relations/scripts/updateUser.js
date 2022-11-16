import mongoose from "mongoose";
import connectDatabbase from "../database/index.js";
import postModel from "../database/post.js";
import userModel from "../database/user.js";
import commentModel from "../database/comment.js";

connectDatabbase().then(test)

async function test() {

    // Situation: User updates their name or other information

    const userId = '633319f7c810b5f9099efffb';

    let user = await userModel.findById(userId)

    user.name = 'Ms Urmila Mathur';

    await user.save();

    await postModel.updateMany({
        "user._id": mongoose.Types.ObjectId(userId)
    }, {
        user: {
            _id: user._id,
            name: user.name,
            image: user.image,
            about: user.about,
            followerCount: user.followerCount,
        }
    })

    const posts = await postModel.find({
        // querying on embedded documents
        "user._id": mongoose.Types.ObjectId(userId)
    });

    
    await commentModel.updateMany({
        "user._id": mongoose.Types.ObjectId(userId)
    }, {
        user: {
            _id: user._id,
            name: user.name,
            image: user.image,
        }
    })

    const comments = await commentModel.find({
        // querying on embedded documents
        "user._id": mongoose.Types.ObjectId(userId)
    });

    // console.log(posts)
    console.log(comments)
}
