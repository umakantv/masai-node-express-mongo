import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { getRelativeTime } from "../Utils/Timestamp";

export default function CommentCard({ comment }) {
  return (
    <Card style={{ marginTop: 10 }} variant="outlined">
      <CardContent>
        <CardActions
          style={{ padding: 0, marginBottom: 10, alignItems: "center" }}
        >
          <Avatar
            style={{ width: 30, height: 30 }}
            alt={comment.author.name}
            src={comment.author.image}
          />
          <Typography variant="h5" component="div">
            {comment.author.name}
          </Typography>
        </CardActions>
        <Typography variant="body1" color="text.primary">
          {comment.content} <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getRelativeTime(comment.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
