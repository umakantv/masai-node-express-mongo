import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBlogs } from '../../api/blogs';
import BlogCard from '../Blogs/BlogCard';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

export default function Blogs() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(15)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [blogs, setBlogs] = useState([])
    const [totalBlogs, setTotalBlogs] = useState(0)

    useEffect(() => {
        getBlogs(page, pageSize, search, sortBy, sortOrder)
        .then(response => {
            const {totalBlogs, blogs} = response.data.data;

            setTotalBlogs(totalBlogs)
            setBlogs(blogs)

        })
    }, [page, pageSize, search, sortBy, sortOrder])

    return <>
        Total Blogs: <h4>{totalBlogs}</h4>

        <Link to='/create'>Create</Link>
        {blogs.map((blog, i) => {
            return <BlogCard key={i} blog={blog} />
        })}
    </>
}