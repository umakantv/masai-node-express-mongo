const makeCoffee = require("./coffee")
const makeTea = require("./tea")


function makeRecipe(recipe, variant) {
    if (recipe === 'tea') {
        makeTea(variant)
    } else if (recipe === 'coffee') {
        makeCoffee(variant)
    } else {
        console.log('Not supported')
    }
}

module.exports = makeRecipe;