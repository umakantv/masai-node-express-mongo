import React from "react";
import { Avatar, Card } from "antd";

export default function PostCard({post}) {
  return (
    <a href={"/post/" + post._id}>
      <Card style={{marginTop: 10}}>
        <h2>{post.title}</h2>
        <div style={{ display: "flex" }}>
          <Avatar src={post.user.image} style={{ paddingRight: 10 }} />
          <h3>{post.user.name}</h3>
        </div>
        <span>{post.createdAt}</span>
      </Card>
    </a>
  );
}
