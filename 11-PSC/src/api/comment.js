import axios from ".";

export async function getCommentsByBlogId(id) {
    return axios.get(`/comment/${id}`)
}

export async function addComment(content, postId) {
    return axios.post(`/comment/${postId}`, {
        content
    })
}
