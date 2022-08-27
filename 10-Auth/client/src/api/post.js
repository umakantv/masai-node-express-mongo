import API from ".";

class PostApi extends API {
    async getAll(skip = 0, limit = 5) {
        const response = await this.axios.get(`${this.baseUrl}/posts/all?skip=${skip}&limit=${limit}`)
        return response.data
    }
    async getPost(id) {
        const response = await this.axios.get(`${this.baseUrl}/posts/${id}`)
        return response.data
    }
    async createPost(data) {
        const response = await this.axios.post(`${this.baseUrl}/posts`, data)
        return response.data
    }
    async deletePost(id) {
        const response = await this.axios.delete(`${this.baseUrl}/posts/${id}`)
        return response.data
    }
}

const postApi = new PostApi()

export default postApi;