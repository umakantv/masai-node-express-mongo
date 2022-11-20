import axios from ".";

export async function loginApi(email, password) {
  return axios.post("/user/login", {
    email,
    password,
  });
}

export async function registerApi(name, email, password) {
  return axios.post("/user/register", {
    name,
    email,
    password,
  });
}

export async function loginWithGithubApi(code) {
  return axios.get(`/user/githubSignin?code=${code}`);
}

export async function getLoggedInUser(token) {
  return axios.get(`/user/loggedInUser`);
}

export async function getUser(userId) {
  return axios.get(`/user/${userId}`);
}
