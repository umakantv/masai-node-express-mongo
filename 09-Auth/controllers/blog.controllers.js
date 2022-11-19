const blogModel = require("../database/blog.model");
const userModel = require("../database/user.model");

async function getBlogsByUserId(req, res) {

    const {userId} = req.params;

    const blogs = await blogModel.find({
        'author.authorId': userId,
    }).sort({
        createdAt: -1
    })

    return res.send({
        status: 'success',
        data: blogs
    })
}

async function getBlogsPaginated(req, res) {

    const {
        search = '',
        pageSize = 10, 
        page = 1,
        sortBy = 'createdAt',
        sortOrder = 'desc' 
    } = req.query;

    const totalBlogs = await blogModel.find({
        title: {
            $regex: search
        }
    }).count();

    const blogs = await blogModel.find({
        title: {
            $regex: search
        }
    })
    .sort({
        [sortBy]: sortOrder === 'asc' ? 1 : -1
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

    return res.send({
        status: 'success',
        data: {
            totalBlogs,
            blogs,
            page,
            pageSize
        }
    })
}

async function createBlogPost(req, res) {

    const blog = req.body;
    const {user} = req;

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }

    blog.author = {
        _id: user._id,
        name: user.name,
        image: user.image,
    }

    const blogData = await blogModel.create(blog);

    // No need to await this
    userModel.findByIdAndUpdate(user._id, {
        $set: {
            blogsCount: user.blogsCount + 1
        }
    });

    return res.send({
        status: 'success',
        data: blogData
    })
}

async function getBlogById(req, res) {

    const {id} = req.params;

    const blog = await blogModel.findById(id);

    return res.send({
        status: 'success',
        data: blog
    })
}

module.exports = {
    getBlogsByUserId,
    getBlogsPaginated,
    createBlogPost,
    getBlogById,
}