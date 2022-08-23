const connectDatabase = require("./db");

async function test() {
    await connectDatabase();
}

test();