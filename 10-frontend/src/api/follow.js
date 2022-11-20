import axios from ".";

export async function getFollowing(userId) {
  return axios.get(`/follow/following/${userId}`);
}

export async function getFollowers(userId) {
  return axios.get(`/follow/followers/${userId}`);
}

export async function follow(userId) {
  return axios.post(`/follow/${userId}`);
}

export async function unfollow(userId) {
  return axios.delete(`/follow/${userId}`);
}
