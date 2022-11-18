import axios from ".";

export async function loginApi(email, password) {
    return axios.post('/user/login', {
        email, password
    })
}

export async function loginWithGithubApi(code) {
    return axios.get(`/user/githubSignin?code=${code}`)
}

export async function getLoggedInUser(token) {
    return axios.get(`/user/loggedInUser`)
}