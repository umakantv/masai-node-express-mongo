const blogModel = require("../database/blog.model");
const commentsModel = require("../database/comment.model");

async function getBlogComments(blogId) {
    return commentsModel.find({
        blogId
    }).sort({
        createdAt: -1
    })
}

async function getCommentsByBlogId(req, res) {
    const {id} = req.params;

    const comments = await getBlogComments(id);

    return res.send({
        status: 'success',
        data: comments
    })
}

async function createComment(req, res) {

    try {

        const comment = req.body;
        const {user} = req;
    
        if (!user) {
            return res.status(400).send({
                status: 'error',
                message: 'User not logged in'
            })
        }
    
        comment.author = {
            _id: user._id,
            name: user.name,
            image: user.image,
        }
    
        if (!comment.blogId) {
            throw new Error('Blog id is not provided');
        }
        
        const commentData = await commentsModel.create(comment);
    
        // https://www.mongodb.com/docs/manual/reference/operator/update/inc/#example
        await blogModel.findByIdAndUpdate(comment.blogId, {
            $inc: {
                commentCount: 1,
            }
        })
    
        return res.send({
            status: 'success',
            data: commentData
        })
    } catch(err) {

        return res.status(500).send({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

// TODO
/**
 * Delete a comment from a post and decrease the comment count
 * 
 * User must not be able to delete other users' comments
 */
async function deleteComment(req, res) {}

// TODO
/**
 * Edit comment content
 * 
 * User must be able to edit only comments that are authored by him/her
 */
async function editComment(req, res) {}

module.exports = {
    getBlogComments,
    createComment,
    getCommentsByBlogId,
    editComment,
    deleteComment
}