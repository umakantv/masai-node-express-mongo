import { Avatar, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postApi from "../api/post";
import CommentCard from "../components/comment";
import CommentForm from "../components/commentForm";

export default function Post() {
  const params = useParams();

  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true);

  const fetchPost = () => postApi.getPost(params.postId).then(response => {
    const post = response.data;

    // post.comments = post.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setPost(post)
    setLoading(false)
  })

  useEffect(() => {
    fetchPost();
  }, [])

  useEffect
  return (
    <div>
      <h1>Post</h1>
      {
        loading ?
        <Skeleton /> :
        <div>
          <h1>{post.title}</h1>
          <div style={{ display: "flex" }}>
            <Avatar src={post.user.image} style={{ paddingRight: 10 }} />
            <h3>{post.user.name}</h3>
          </div>
          <p>{post.content}</p>
          
          <h2>All Comments</h2>

          <CommentForm postId={post._id} fetchPost={fetchPost} />
          {
            post.comments.map(comment => {
              return <CommentCard key={comment._id} comment={comment} />
            })
          }

        </div>
      }
    </div>
  );
}
