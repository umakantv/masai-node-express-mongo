import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CommentForm({submit}) {
  const [content, setContent] = useState("");

  return (
    <Card>
      <CardContent>

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
        <Button size="small" variant="contained" onClick={() => {
          submit(content)
          .then(() => {
            setContent('');
          })
          .catch(console.log)
        }}>
          Add Comment
        </Button>
      </CardActions>
    </Card>
  );
}
