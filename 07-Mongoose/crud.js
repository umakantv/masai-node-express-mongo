import { connectDatabase } from "./database/connectDB.js"
import employeeModel from "./database/employees.model.js"


async function test() {
    try {

        await connectDatabase()
    
        // let first4Employees = await employeeModel.find().limit(4);

        // console.log(first4Employees)

        // let employee = {
        //     name: 'Umakant Vashishtha',
        //     company: 'Razorpay',
        //     department: false,
        //     salary: 34344, // works
        //     salary: 'asasdf234234', // fails
        //     gender: 'Male' // Valid values: 'Male', 'Female', 'Other'
        // }

        // const result = await employeeModel.insertMany(employee)

        // console.log(result)

        // const result = await employeeModel.updateOne({
        //     __id: "636e6ea2dde550f7f587b906"
        // }, {
        //     $set: {
        //         salary: 4567 // works
        //         // salary: 'asdf34343' // fail
        //     }
        // })

        // console.log(result);

        // const result = await employeeModel.findByIdAndUpdate("636e6ea2dde550f7f587b906", {
        //     $set: {
        //         department: 'Business Development'
        //     }
        // })

        // console.log(result); // result will be document before update

        // const employees = await employeeModel.insertMany([
        //     {
        //         name: 'Umakant Vashishtha',
        //         company: 'Razorpay',
        //         department: 'Emgineering',
        //         salary: 34344, // works
        //         gender: 'Male' // Valid values: 'Male', 'Female', 'Other'
        //     },
        //     {
        //         name: 'Abhishek Mishra',
        //         company: 'Naukri.com',
        //         department: 'Emgineering',
        //         salary: 34344, // works
        //         gender: 'Male' // Valid values: 'Male', 'Female', 'Other'
        //     },
        //     {
        //         name: 'Shruti Tyagi',
        //         company: 'Razorpay',
        //         department: 'Human Resources',
        //         salary: 34344, 
        //         gender: 'Female'
        //     }
        // ])

        // console.log(employees);

        // const result = await employeeModel.updateMany({
        //     name: 'Tom Kanks'
        // }, {
        //     $set: {
        //         name: 'Tom Hanks'
        //     }
        // })

        // console.log(result)

        // const result = await employeeModel.findByIdAndDelete("636e6ea2dde550f7f587b906")
        // result will be document value if existed, or null
        // console.log(result);

        const result = await employeeModel.deleteOne({
            _id: "636e6ea2dde550f7f587b906"
        })

        console.log(result)

        let employee = await employeeModel.findById("636e6ea2dde550f7f587b906")

        console.log(employee);

    } catch(err) {

        console.error(err);

        // return res.status(500).send('Something went wrong')
    }
}

test()