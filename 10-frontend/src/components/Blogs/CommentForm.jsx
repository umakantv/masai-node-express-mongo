import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";

export default function CommentForm({ submit }) {
  const { user, setShowLoginForm } = useContext(AuthContext);
  const [content, setContent] = useState("");

  if (!user) {
    return (
      <CardActions style={{ alignItems: "flex-end" }}>
        <Button
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            setShowLoginForm(true);
          }}
        >
          Login to Add a Comment
        </Button>
      </CardActions>
    );
  }

  return (
    <CardActions style={{ alignItems: "flex-start" }}>
      <div>
        <Avatar alt={user?.name} src={user?.image} />
      </div>
      <div>
        <TextField
          autoFocus
          id="content"
          label="Body"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            submit(content)
              .then(() => {
                setContent("");
              })
              .catch(console.log);
          }}
        >
          Add Comment
        </Button>
      </div>
    </CardActions>
  );
}
