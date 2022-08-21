// Diagram: https://excalidraw.com/#json=infJnb82et3V6CwspyvcI,xS-X-IQi05a8ivd5s37CKQ


const crypto = require('crypto')

console.log(crypto.randomInt(10, 11))
// Callstack

function makeTea(variant) {
    console.log('Completed', variant, 'tea');
}

function makeCoffee(variant) {
    console.log('Completed', variant, 'coffee');
}

function makeRecipe(recipe, variant) {
    if (recipe === 'tea') {
        makeTea(variant);
    } else if (recipe === 'coffee') {
        makeCoffee(variant);
    } else {
        console.log('Invalid recipe');
    }
}

function action2() {
    makeRecipe('coffee', 'cappuccino');
}

function action1() {
    // makeRecipe('tea', 'masala');
    // heavy computation - has 999999 instructions

    console.log(new Date(), 'Action');
    let count = 0;
    for (let i = 0; i < 1000000; i++) {
        count++;
    }
    console.log(new Date(), 'Finished heavy computation');
}

// action1();
// action2();

setTimeout(action1, 0);
setTimeout(action2, 0);

function improtantAction() {
    console.log('Very important, execute me between your callback queues')
}

process.nextTick(improtantAction);

console.log('After setting timeout'); // printed immediately, we do not wait 3 seconds

// action 1 - event that will take 2 seconds to be completed - 
// example - we make an API call to some other server - takes 2 seconds to response

// action 2
// example - we want to send an email - takes 3 seconds
// we don't have to wait for action 1