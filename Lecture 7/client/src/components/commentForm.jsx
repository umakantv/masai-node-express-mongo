import React, { useContext, useState } from "react";
import { Card, Input, Button, notification } from "antd";
import AuthContext from "../Auth";

async function addComment(body) {
  body = JSON.stringify({
    comment: body,
  });

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3001/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
    body,
  });

  const data = await response.json();

  return data;
}

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const { user, setShowUserModal } = useContext(AuthContext);

  const onAddComment = () => {
    addComment({ content, postId })
      .then((data) => {
        console.log(data);
        const { token } = data.data;

        localStorage.setItem("token", token);

        window.location.reload();
        // alert("Login successful")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card>
      <h2>Add Comment </h2>
      {user ? (
        <div>
          <Input
            placeholder="Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button t ype="primary" onClick={onAddComment}>
            Add Comment
          </Button>
        </div>
      ) : (
        <Button type="link" onClick={() => setShowUserModal(true)}>
          Login First
        </Button>
      )}
    </Card>
  );
}
