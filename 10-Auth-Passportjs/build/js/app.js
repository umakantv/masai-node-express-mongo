

console.log("Hello from browser")


if (window.location.pathname === "/github-signin") {
    // console.log(window)
    const reqParams = new URLSearchParams(window.location.search)

    const code = reqParams.get('code')

    console.log('Github Code', code);

    fetch(`/user/github-signin/${code}`)
    .then(response => response.json())
    .then(data => {
        document.body = JSON.stringify(data);
    })

}