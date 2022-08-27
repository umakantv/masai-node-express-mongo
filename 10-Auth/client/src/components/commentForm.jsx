import React, { useContext, useState } from "react";
import { Card, Input, Button, notification } from "antd";
import AuthContext from "../Auth";
import commentApi from "../api/comment";

export default function CommentForm({ postId, fetchPost }) {
  const [content, setContent] = useState("");
  const { user, setShowUserModal } = useContext(AuthContext);

  const onAddComment = () => {
    commentApi.createcomment({
      comment: { content, post: postId }
    })
    .then((data) => {
      console.log(data);
      fetchPost()
      notification.info('Comment added');
    })
    .catch((err) => {
      console.error(err)
      notification.error(err.message);
    });
  };

  return (
    <div>
      <h2>Add Comment </h2>
      {user ? (
        <div>
          <Input
            placeholder="Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button t ype="primary" onClick={onAddComment} style={{marginTop: 10}}>
            Add Comment
          </Button>
        </div>
      ) : (
        <Button type="link" onClick={() => setShowUserModal(true)}>
          Login First
        </Button>
      )}
    </div>
  );
}
