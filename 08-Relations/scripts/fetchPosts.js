import connectDatabbase from "../database/index.js";
import postModel from "../database/post.js";

connectDatabbase().then(test)

async function test() {

    const posts = await postModel.find().limit(10);

    console.log(posts)
}
