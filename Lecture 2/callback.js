

function dontWaitForMe() {
    console.log("Don't wait for me");  // 1
}

function executeMeImmediately() {

    let counter = 0;
    // console.log("Doing heavy computation");  // 2
    // loading up callstack with A3, many times
    for (let i = 0; i < 100000; i++) {
        counter++; // 3
    }
    console.log("Executed immediately.");
}

setTimeout(dontWaitForMe, 2000); // let's assume this is an API call
setTimeout(executeMeImmediately, 0);
setTimeout(executeMeImmediately, 0);
setTimeout(executeMeImmediately, 0);
setTimeout(executeMeImmediately, 0);
setTimeout(executeMeImmediately, 0);
setTimeout(executeMeImmediately, 0);


function veryImportantAction() {
    console.log("Execute me even if you can between phases.")
}

process.nextTick(veryImportantAction);

function heavyComputation() {
    let counter = 0;
    console.log("Doing heavy computation");
    // loading up callstack with A3, many times
    for (let i = 0; i < 100000; i++) {
        counter++; // 3
    }
    console.log("Doing heavy computation");
}

setTimeout(heavyComputation, 0);

console.log("An alert for user"); // 4