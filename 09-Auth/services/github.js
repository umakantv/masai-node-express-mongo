const axios = require('axios')

class GithubService {

    async getAccessToken(code) {

        try {
            let clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
            let clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
    
            let url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    
            let response = await axios.post(url);
    
            const result = new URLSearchParams(response.data);
    
            if (result.get('error')) {
                throw new Error('Failed to get access token: ' + result.get('error_description'));
            }
    
            return result.get('access_token');

        } catch(err) {

            console.error(err)
            throw err;
        }
    }

    async getUser(code) {

        try {
            const token = await this.getAccessToken(code);
            
            let url = 'https://api.github.com/user';
        
            let response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            return response.data;

        } catch(err) {

            console.error(err.message)
            throw err;
        }
    }
}

module.exports = GithubService;