
console.log('Log in frontend')

let params = new URLSearchParams(window.location.search);

let error = params.get('error')
let code = params.get('code')

if (error) {
    document.body.innerHTML = params.get('error_description')
} else {

    console.log('Code', params.get('code'))
}