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

async function getBlogs(req, res) {

    try {

        let {
            page = 1,
            pageSize = 10,
            search = ''
        } = req.query;

        page = parseInt(page);
        pageSize = parseInt(pageSize);

        let blogs = await Post.find({
            title: {
                $regex: new RegExp(search, 'i')
            }
        })
        .sort({
            createdAt: -1
        }).limit(pageSize).skip((page - 1) * pageSize);

        let totalBlogs = await Post.count({
            title: {
                $regex: new RegExp(search, 'i')
            }
        });
    
        return res.send({
            data: {
                blogs,
                totalBlogs
            }
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }


}

async function getBlogById(req, res) {

    try {

        const {id} = req.params;

        let blog = await Post.findById(id);

        if (blog) {
            return res.send({
                data: blog
            })

        } else {
            return res.status(404).send({
                error: 'Blog does not exist'
            })
        }
    
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createPost,
    getBlogs,
    getBlogById
}