import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CommentCard({comment}) {
  return (
    <Card style={{marginTop: 10}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <img src={comment.author.image} width={40} /> {comment.author.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment.content} <br />
            {comment.createdAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
