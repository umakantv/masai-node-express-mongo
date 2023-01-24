

let search = new URLSearchParams(window.location.search)

let code = search.get('code')

async function loginWithGithub(code) {
    let res = await fetch(`/loginWithGithub?code=${code}`)
    res = res.json()

    console.log(res)
}

if (code) {
    loginWithGithub(code)
}
