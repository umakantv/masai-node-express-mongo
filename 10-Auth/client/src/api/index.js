import Axios from 'axios';

class API {
    constructor() {
        this.axios = Axios.create({
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem("token")
            }
        })
        this.baseUrl = "http://13.233.109.184:3020"
    }

    ping() {
        this.axios.get(this.baseUrl + '/ping')
    }
}

export default API;