import React, { useEffect, useState } from "react";
import PostCard from "../components/postCard";

async function getPosts() {
  const response = await fetch(
    "http://localhost:3001/posts/all?skip=0&limit=5"
  ).catch((err) => {
    console.log(err);
  });

  const data = await response.json();

  return data;
}

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((response) => setPosts(response.data));
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
