import axios from ".";

export async function addCommentApi(postId, content) {
    return axios.post(`/post/${postId}/comment`, {
        content
    })
}

export async function getCommentsByPostId(postId) {
    return axios.get(`/post/${postId}/comments`)
}
