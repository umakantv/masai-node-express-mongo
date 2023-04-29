

console.log("Hey there")

document.getElementById("fib-submit").addEventListener('click', (e) => {

    let numInput = document.getElementById("fib-input");

    let num = numInput.value;

    fetch(`/api/fibonacci/${num}`)
    .then(res => res.text())
    .then((value) => {
        document.getElementById("fib-value").innerHTML = value;
    })
    e.preventDefault()
})