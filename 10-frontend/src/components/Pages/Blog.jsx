import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import { getBlogById } from "../../api/blogs";
import { addComment, getCommentsByBlogId } from "../../api/comment";
import CommentCard from "../Blogs/CommentCard";
import CommentForm from "../Blogs/CommentForm";
import AccountInfo from "../Auth/AccountInfo";
import AccountDetailsCard from "../Auth/AccountDetailsCard";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const params = useParams();

  const id = params.id;

  const fetchComments = () => {
    getCommentsByBlogId(id).then((response) => {
      const comments = response.data.data;
      setComments(comments);
    });
  };

  useEffect(() => {
    getBlogById(id).then((response) => {
      const blog = response.data.data;
      setBlog(blog);
    });

    fetchComments();
    // eslint-disable-next-line
  }, []);

  const user = blog?.author;

  return (
    <Grid container spacing={1}>
      <Grid item sm={12} md={8}>
        <Card variant="outlined">
          <CardContent>
            {blog && (
              <div style={{ margin: "20px 0" }}>
                <Typography gutterBottom variant="h3" component="div">
                  {blog.title}
                </Typography>

                <AccountInfo user={user} timestamp={blog.createdAt} />

                <Typography color="text.secondary">{blog.content}</Typography>
              </div>
            )}
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="h5">Comments</Typography>
          </CardContent>
          <CommentForm
            submit={async (content) => {
              await addComment(content, id);

              return fetchComments();
            }}
          />
          {comments.map((comment, i) => {
            return <CommentCard key={i} comment={comment} />;
          })}
        </Card>
      </Grid>
      <Grid item sm={12} md={4}>
        <AccountDetailsCard userId={user?._id} />
      </Grid>
    </Grid>
  );
}
