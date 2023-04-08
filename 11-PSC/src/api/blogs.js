import axios from ".";

export async function getBlogs(
    page = 1, pageSize = 15, search = '', sortBy = 'createdAt', sortOrder = 'desc') {
    return axios.get('/posts', {
        params: {
            page, pageSize, search, sortBy, sortOrder
        }
    })
}

export async function addBlog(title, content) {
    return axios.post('/posts', {
        title, content
    })
}

export async function getBlogById(id) {
    return axios.get(`/posts/${id}`)
}