const connectDatabase = require("./db");
const User = require("./users");
const { faker } = require('@faker-js/faker')
const crypto = require('crypto');
const Product = require("./product");
const Order = require("./order");


async function addUsers() {
    const users = [];

    for (let i = 0; i < 0; i++) {
        const addresses = new Array(5).fill(0).map(() => ({
            house: faker.address.streetAddress(),
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country(),
        }));
        const user = {
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            image: faker.image.avatar(),
            addresses
        }

        users.push(user);
    }

    User.insertMany(users)
}

async function addProducts() {
    const uoms = ['kg', 'g', 'pcs', 'litres', 'ml'];
    const products = [];

    for (let i = 0; i < 100; i++) {

        const product = {
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            image: faker.image.avatar(),
            price: Number(faker.finance.amount(100, 4000)),
            quantity: Number(faker.finance.amount(1, 10)),
            uom: uoms[crypto.randomInt(0, 5)],
        }

        products.push(product);
    }

    Product.insertMany(products)
}

async function addOrders() {
    // existing users
    // existing products

    const users = await User.find();

    console.log(users.length, 'Users');

    const products = await Product.find();

    console.log(products.length, 'Products');

    const orders = [];

    for (let i = 0; i < 100; i++) {
        const product = products[crypto.randomInt(0, products.length)];
        const quantity = crypto.randomInt(1, 10);
        const amount = Number(product.price * quantity).toFixed(2);
        const user = users[crypto.randomInt(0, users.length)];

        let order = {
            user: user._id,
            product,
            quantity,
            amount,
            address: user.addresses[crypto.randomInt(0, user.addresses.length)]
        }

        // console.log(order);
        orders.push(order);
    }

    await Order.insertMany(orders);
}

async function add() {
    await connectDatabase();
    addOrders();
}

add();