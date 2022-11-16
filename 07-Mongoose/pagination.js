
import connectDatabbase from "./database/index.js";
import userModel from "./database/user.js";

async function test() {

    await connectDatabbase();

    // Displaying documents 1 - 20 of 1000

    // Right now 1-20

    // Total documents - 1000
    // Page Size - 20
    // Page Number - 3

    // Out of 1-1000 we will show 41-60

    // limit
    // skip
    // count


    let pageSize = 20;
    let page = 1;

    let skip = Math.max(0, (page-1) * pageSize); // 2 * 20

    let count = await userModel.countDocuments({ balance : {$gte: 20000} });

    console.log('Count', count)

    let users = await userModel.find({ balance : {$gte: 20000} }).limit(pageSize).skip(skip).sort({
        name: 1
    })

    console.log(users)

    // sort

}

test()