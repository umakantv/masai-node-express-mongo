import API from ".";

class UserApi extends API {
    async getLoggedInUser() {
        const response = await this.axios.get(`${this.baseUrl}/users/getLoggedIn`)
        return response.data
    }
    async register(data) {
        const response = await this.axios.post(`${this.baseUrl}/users/register`, data)
        return response.data
    }
    async login(data) {
        const response = await this.axios.post(`${this.baseUrl}/users/login`, data)
        return response.data
    }
    async googleSignin(data) {
        const response = await this.axios.post(`${this.baseUrl}/users/googleSignin`, data)
        return response.data
    }
    async githubSignin(data) {
        const response = await this.axios.post(`${this.baseUrl}/users/githubSignin`, data)
        return response.data
    }
}

const userApi = new UserApi()

export default userApi;