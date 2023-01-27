const { Comment } = require("../database/Comment");
const { Post } = require("../database/Post");



async function getCommentsByPostId(req, res) {

    try {

        const {postId} = req.params;

        let comments = await Comment.find({
            'post.postId': postId
        }).sort({
            createdAt: -1
        });

        return res.send({
            data: comments
        });

    
    } catch(err) {
        console.log(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function addCommentForPost(req, res) {
    try {
        const {content, postId} = req.body;
        const user = req.user;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(400).send({
                error: 'Post with given id does not exist'
            });
        }

        await Comment.create({
            content,
            user: {
                userId: user._id,
                name: user.name,
                image: user.image,
            },
            post: {
                postId: post._id,
                title: post.title
            }
        });

        return res.send({
            message: 'Comment has been added successfully'
        })


    } catch (err) {

        console.log(err)
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    getCommentsByPostId,
    addCommentForPost
}