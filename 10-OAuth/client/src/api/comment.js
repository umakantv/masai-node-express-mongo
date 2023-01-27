import axios from ".";

export async function getCommentsByBlogId(id) {
    return axios.get(`/comment/post/${id}`)
}

export async function addComment(content, postId) {
    return axios.post('/comment', {
        content, postId
    })
}
