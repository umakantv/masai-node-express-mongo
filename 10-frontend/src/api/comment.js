import axios from ".";

export async function getCommentsByBlogId(id) {
    return axios.get(`/comment/blog/${id}`)
}

export async function addComment(content, blogId) {
    return axios.post('/comment', {
        content, blogId
    })
}
