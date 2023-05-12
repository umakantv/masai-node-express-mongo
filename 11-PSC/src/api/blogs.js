import axios from ".";

export async function getPosts(
    page = 1, pageSize = 15, search = '', sortBy = 'createdAt', sortOrder = 'desc') {
    return axios.get('/posts', {
        params: {
            page, pageSize, search, sortBy, sortOrder
        }
    })
}

export async function addPost(title, content) {
    return axios.post('/posts', {
        title, content
    })
}

export async function getPostById(id) {
    return axios.get(`/posts/${id}`)
}