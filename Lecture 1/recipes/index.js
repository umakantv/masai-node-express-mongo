
const makeCoffee = require('./makeCoffee');
const makeTea = require('./makeTea');

// Module of recipes

function makeRecipe(recipe, recipeOptions) {
    if (recipe === 'coffee') {
        makeCoffee(recipeOptions ? recipeOptions.type : 'Cappuccino');
    } else if (recipe === 'tea') {
        makeTea();
    } else {
        console.log('Recipe not yet available...')
    }
}

module.exports = makeRecipe;