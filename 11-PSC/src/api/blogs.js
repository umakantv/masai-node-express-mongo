import axios from ".";

export async function getBlogs(
    page = 1, pageSize = 5, search = '', sortBy = 'createdAt', sortOrder = 'desc') {
    return axios.get('/post', {
        params: {
            page, pageSize, search, sortBy, sortOrder
        }
    })
}

export async function addBlog(title, content) {
    return axios.post('/post', {
        title, content
    })
}

export async function getBlogById(id) {
    return axios.get(`/post/${id}`)
}