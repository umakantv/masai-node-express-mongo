
import connectDatabbase from "./database/index.js";
import userModel from "./database/user.js";

async function test() {

    await connectDatabbase();

    // we will execute some queries on collections from here

    // Create User

    let user = await userModel.create({
        name: 'Xu Chi',
        email: 'john.doe@john.doe',
        password: 'Somedifficulttoguesspassword',
        age: 32,
        image: 'https://example.com/image.jpeg',
        verifiedEmail: false,
        balance: 23000.34
    })


    console.log('User added')


    // Create Multiple - Insert Many


    // Find All
    let users = await userModel.find().limit(10)

    // console.log(users);




    // Find One

    user = await userModel.findOne({
        email: 'Alvah.Powlowski@gmail.com'
    }, {
        password: 1,
        name: 1,
        email: 1,
        verifiedEmail: 1,
    })


    console.log(user);



    // Update One

    // await userModel.findOneAndUpdate({
    //     email: 'Triston60@gmail.com'
    // }, {
    //     email: 'Triston601@gmail.com'
    // })

    // user.email = 'jason.doe@john.doe'
    // user.name = 'Jason Doe'


    // Update Many

    // await userModel.updateMany({
    //     age: 99
    // }, {
    //     age: 32
    // })



    // Delete One
    // await userModel.findOneAndDelete({
    //     email: 'Jayne.Jacobi@yahoo.com'
    // })

    // Delete Many
    // await userModel.deleteMany({
    //     age: {
    //         $mod: [2, 0]
    //     }
    // })


}

test();