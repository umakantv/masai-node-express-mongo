import React from 'react';
import { useEffect, useState } from 'react';
import { getBlogById } from '../../api/blogs';
import BlogCard from '../Blogs/BlogCard';
import { addComment, getCommentsByBlogId } from '../../api/comment';
import CommentCard from '../Blogs/CommentCard';
import { useParams } from 'react-router';
import CommentForm from '../Blogs/CommentForm';

export default function Blog() {

    const [blog, setBlog] = useState(null)
    const [comments, setComments] = useState([])

    const params = useParams()

    const id = params.id

    const fetchComments = () => {
        getCommentsByBlogId(id)
        .then(response => {
            const comments = response.data.data
            setComments(comments)
        })
    }
    useEffect(() => {
        getBlogById(id)
        .then(response => {
            const blog = response.data.data
            setBlog(blog)
        })

        fetchComments()
    }, [])

    return <div>
        {blog && <BlogCard blog={blog} />}
        <CommentForm submit={async (content) => {
            await addComment(content, id)

            return fetchComments()
        }} />
        {comments.map((comment, i) => {
            return <CommentCard key={i} comment={comment} />
        })}
    </div>
}