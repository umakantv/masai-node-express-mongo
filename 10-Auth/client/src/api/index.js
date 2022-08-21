import Axios from 'axios';

class API {
    constructor() {
        this.axios = Axios.create({
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem("token")
            }
        })
        this.baseUrl = "https://localhost:3001"
    }
}

export default API;