import React, { useContext } from "react";
import { useState } from "react";
import { addBlog } from "../../api/blogs";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import AuthContext from "../../contexts/auth";
import { Typography } from "@mui/material";

export default function BlogForm() {
  const [title, setTitle] = useState("Your Awesome Post");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Typography>Login to create a Blog</Typography>;
  }

  const submit = () => {
    addBlog(title, content)
      .then(() => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <CardContent>
        <TextField
          margin="dense"
          autoFocus
          id="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          autoFocus
          id="content"
          label="Body"
          margin="dense"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={submit}>
          Submit
        </Button>
        <Button size="small">Cancel</Button>
      </CardActions>
    </>
  );
}
