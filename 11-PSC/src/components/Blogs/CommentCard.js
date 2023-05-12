import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import AccountInfo from "../Auth/AccountInfo";
import Divider from "@mui/material/Divider";

export default function CommentCard({ comment }) {
  return (
    <>
      <CardContent>
        <CardActions
          style={{ padding: 0, marginBottom: 10, alignItems: "center" }}
        >
          <AccountInfo user={comment.author} timestamp={comment.createdAt} />
        </CardActions>
        <Typography
          variant="body1"
          color="text.primary"
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {comment.comment} <br />
        </Typography>
      </CardContent>
      <Divider />
    </>
  );
}
