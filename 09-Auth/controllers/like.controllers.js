const blogModel = require("../database/blog.model");
const commentsModel = require("../database/comment.model");

// TODO
/**
 * Add a like to a blog or a comment
 * 
 * Request will have either of the query params: blogId or commentId
 * 
 * User must be logged in
 * We must not add duplicate likes
 */
async function like(req, res) {}

// TODO
/**
 * Remove a like from blog or comment
 * 
 * Request will have either of the query params: blogId or commentId
 * 
 * User must be logged in
 */
async function removeLike(req, res) {}

// TODO
/**
 * Get all like on a blog or comment
 * 
 * Request will have either of the query params: blogId or commentId
 */
async function getAllLikes(req, res) {}


module.exports = {
    like,
    removeLike,
    getAllLikes,
}