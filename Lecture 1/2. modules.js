// This will be a module responsible for recipes

// Core module
// Third party modules - npm
// User generated modules - Our application is made up of different

// Core module
const path = require('path');
const makeRecipe = require('./recipes/index.js')

const voucher_generator = require('voucher-code-generator');

const codes = voucher_generator.generate({
    length: 8,
    count: 5
});

console.log(codes);

makeRecipe('coffee');
