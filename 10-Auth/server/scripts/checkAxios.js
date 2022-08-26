const axios = require('axios').default;

axios.post('https://github.com/login/oauth/access_token?client_id=72e71aa44baa188dd4dd&client_secret=569e9fab21f77510bd6bb6c239976c441a00ef30&code=028f2be6ffddee9a05ae')
.then(response => {
    console.log(response.data)
}).catch(err => {
    console.error(err)
})