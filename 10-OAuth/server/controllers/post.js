const { Post } = require("../database/Post")

async function createPost(req, res) {

    try {

        const user = req.user;
    
        const {
            title, content
        } = req.body;
        
        const post = await Post.create({
            title, content,
            author: {
                userId: user._id,
                name: user.name,
                image: user.image
            }
        })
    
        return res.send({
            data: post
        })
    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }


}

module.exports = {
    createPost,
}