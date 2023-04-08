import axios from ".";

export async function loginApi(email, password) {
  return axios.post("/auth/login", {
    email,
    password,
  });
}

export async function registerApi(name, email, password) {
  return axios.post("/auth/register", {
    name,
    email,
    password,
  });
}

export async function loginWithGithubApi(code) {
  return axios.get(`/auth/github-signin/${code}`);
}

export async function getLoggedInUser() {
  return axios.get(`/auth/loggedInUser`);
}

export async function getUser(userId) {
  return axios.get(`/user/${userId}`);
}
