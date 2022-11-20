import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";

export default function CommentForm({ submit }) {
  const { user, setShowLoginForm } = useContext(AuthContext);
  const [content, setContent] = useState("");

  if (!user) {
    return (
      <CardContent style={{ alignItems: "flex-end" }}>
        <Button
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            setShowLoginForm(true);
          }}
        >
          Login to Add a Comment
        </Button>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <Stack direction="row" spacing={2}>
        <div>
          <Avatar alt={user?.name} src={user?.image} />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            autoFocus
            id="content"
            label="Add a Comment"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            size="small"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="outlined"
            size="small"
            style={{ marginTop: 10 }}
            onClick={() => {
              submit(content)
                .then(() => {
                  setContent("");
                })
                .catch(console.log);
            }}
          >
            Add
          </Button>
        </div>
      </Stack>
    </CardContent>
  );
}
