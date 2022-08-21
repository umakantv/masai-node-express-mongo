import React from "react";
import { Avatar, Card } from "antd";

export default function CommentCard({comment}) {
  return (
      <Card style={{marginTop: 10}}>
        <div style={{ display: "flex" }}>
          <Avatar src={comment.user?.image} style={{ paddingRight: 10 }} />
          <h3>{comment.user?.name}</h3>
        </div>
        <h2>{comment.content}</h2>
        <span>{comment.createdAt}</span>
      </Card>
  );
}
