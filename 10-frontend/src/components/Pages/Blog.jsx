import React from "react";
import { useEffect, useState } from "react";
import { getBlogById } from "../../api/blogs";
import { addComment, getCommentsByBlogId } from "../../api/comment";
import CommentCard from "../Blogs/CommentCard";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import CommentForm from "../Blogs/CommentForm";
import { Divider } from "@mui/material";
import AccountInfo from "../Auth/AccountInfo";

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
    <div>
      {blog && (
        <div style={{ margin: "20px 0" }}>
          <Typography gutterBottom variant="h3" component="div">
            {blog.title}
          </Typography>

          <AccountInfo user={user} timestamp={blog.createdAt} />

          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </div>
      )}

      <Divider />
      <Typography variant="h5" style={{ marginTop: 20 }}>
        Comments
      </Typography>
      <CommentForm
        submit={async (content) => {
          await addComment(content, id);

          return fetchComments();
        }}
      />
      {comments.map((comment, i) => {
        return <CommentCard key={i} comment={comment} />;
      })}
    </div>
  );
}
