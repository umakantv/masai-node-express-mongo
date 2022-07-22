import API from ".";

class CommentApi extends API {
    async getAll() {
        const response = await this.axios.get(`${this.baseUrl}/comments/getAll`)
        return response.data
    }
    async createcomment(data) {
        const response = await this.axios.comment(`${this.baseUrl}/comments`, data)
        return response.data
    }
    async deletecomment(id) {
        const response = await this.axios.delete(`${this.baseUrl}/comments/${id}`)
        return response.data
    }
}

const commentApi = new CommentApi()

export default commentApi;