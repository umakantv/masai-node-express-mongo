import React, { useEffect, useState } from "react";
import postApi from "../api/post";
import PostCard from "../components/postCard";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postApi.getAll(0, 10)
    .then((response) => setPosts(response.data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {
        posts.map(post => {
          return <PostCard key={post._id} post={post} />
        })
      }
    </div>
  );
}
