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
        <CardActions style={{ alignItems: "center" }}>
          <Avatar
            style={{ width: 40 }}
            alt={comment.author.name}
            src={comment.author.image}
          />
          <Typography gutterBottom variant="h5" component="div">
            {comment.author.name}
          </Typography>
        </CardActions>
        <Typography variant="body2" color="text.secondary">
          {comment.content} <br />
          {getRelativeTime(comment.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
