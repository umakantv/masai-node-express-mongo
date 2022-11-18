import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { addBlog } from "../../api/blogs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

export default function BlogForm() {
  const [title, setTitle] = useState("Your Awesome Post");
  const [content, setContent] = useState("");

  const submit = () => {
    addBlog(title, content)
    .then(response => {
        window.location = '/'
    })
    .catch(err => {
      console.log(err.response.data)
    })
  }

  return (
    <Card>
      <CardContent>
        <TextField
          autoFocus
          id="title"
          label="Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Body"
          fullWidth
          multiline
          rows={4}
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={submit}>
          Submit
        </Button>
        <Button size="small">Cancel</Button>
      </CardActions>
    </Card>
  );
}
