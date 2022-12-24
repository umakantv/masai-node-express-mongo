require('dotenv').config()

const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('build')); // next is not called

app.get('/github-login/:code', async (req, res) => {

    const code = req.params.code;

    try {
        let url = `https://github.com/login/oauth/access_token`;

        let response = await axios.post(url, {
            client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
            client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
            code: code
        }, {
            headers: {
                'Accept': "application/json"
            }
        })

        const data = response.data;

        url = "https://api.github.com/user"

        response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        })

        res.send({
            data: response.data
        })

    } catch (err) {
        console.error(err.message)
        res.send({
            error: 'Something went wrong'
        })
    }
})

app.all('/*', (req, res, next) => {
    const indexFile = path.join(__dirname, 'build', 'index.html');
    // console.log(indexFile);
    res.sendFile(indexFile);
})

app.listen(3066, () => {
    console.log('Server listening at http://localhost:3066')
});