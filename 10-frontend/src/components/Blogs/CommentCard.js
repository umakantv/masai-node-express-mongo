import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import AccountInfo from "../Auth/AccountInfo";

export default function CommentCard({ comment }) {
  return (
    <Card style={{ marginTop: 10 }} variant="outlined">
      <CardContent>
        <CardActions
          style={{ padding: 0, marginBottom: 10, alignItems: "center" }}
        >
          <AccountInfo user={comment.author} timestamp={comment.createdAt} />
        </CardActions>
        <Typography variant="body1" color="text.primary">
          {comment.content} <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
