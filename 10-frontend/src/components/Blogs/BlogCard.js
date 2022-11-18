import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogCard({blog}) {
  return (
    <Card style={{marginTop: 10}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
