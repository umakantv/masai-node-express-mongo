

console.log('Hello in browser')

let params = new URLSearchParams(window.location.search)

let code = params.get('code')

console.log('Code', code)

async function signinWithGithub(code) {
    try {
        let response = await fetch(`/auth/signinWithGithub/${code}`);
    
        response = await response.json();
    
        console.log(response);

        const {user} = response.data

        const userDiv = document.createElement('div');

        userDiv.innerHTML = `
            <img src="${user.image}" />
        `

        document.body.appendChild(userDiv);
    } catch(err) {
        console.error(err);
    }
}

if (code) {
    signinWithGithub(code);
}