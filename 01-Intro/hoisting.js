

// greeting('PT WEB 6')

// function greeting(name)
// {
//     console.log('Hello', name)
// }

// console.log(a)

function functionScope() {

    a = 14;
    
    console.log(a)
    
    if (a == 45) {
        var a = 45;
    }
}


function keepRunning() {
    console.log('Running')
    setTimeout(keepRunning, 1000)
}

keepRunning()
