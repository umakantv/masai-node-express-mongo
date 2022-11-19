import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../Utils/Timestamp";

export default function BlogCard({ blog, ...rest }) {
  const { author: user } = blog;
  return (
    <Card style={{ marginTop: 10 }} {...rest}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </CardContent>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar alt={user?.name} src={user?.image} />
            <div style={{ marginLeft: 10 }}>
              <Typography>{user?.name}</Typography>
              <Typography>{getRelativeTime(blog.createdAt)}</Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CommentIcon fill="red" />
            <Typography style={{ paddingLeft: 10 }} variant="h6">
              {blog.commentCount}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
