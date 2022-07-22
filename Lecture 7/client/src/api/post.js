import API from ".";

class PostApi extends API {
    async getAll() {
        const response = await this.axios.get(`${this.baseUrl}/posts/getAll`)
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