import axios from ".";

export async function getCommentsByBlogId(id) {
    return axios.get(`/comments/${id}`)
}

export async function addComment(content, postId) {
    return axios.post(`/comments/${postId}`, {
        comment: content
    })
}
