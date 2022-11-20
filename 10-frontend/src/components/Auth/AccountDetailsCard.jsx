import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FollowingContext from "../../contexts/following";
import { getUser } from "../../api/user";

export default function AccountDetailsCard({ userId }) {
  const { followingUser, followUser, unfollowUser, following } =
    useContext(FollowingContext);
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    getUser(userId).then((res) => setUser(res.data.data));
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) return "";

  const alreadyFollow = followingUser(user._id);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={2} style={{ margin: "10px 0" }}>
          <Avatar alt={user?.name} src={user?.image} />
          <Stack>
            <Typography variant="body1">{user?.name}</Typography>
            <Typography variant="caption">
              {user.followerCount} Followers
            </Typography>
          </Stack>
        </Stack>
        <Button
          style={{ marginBottom: 10 }}
          size="small"
          fullWidth
          variant="outlined"
          onClick={() => {
            if (alreadyFollow) {
              unfollowUser(user._id).then(fetchUser);
            } else {
              followUser(user._id).then(fetchUser);
            }
          }}
        >
          {alreadyFollow ? "Unfollow" : "Follow"}
        </Button>
        <Typography>{user.blogsCount} Posts</Typography>
        {user.authType === "github" && (
          <a href={`https://github.com/${user.githubUsername}`} target="_blank">
            <Typography>https://github.com/{user.githubUsername}</Typography>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
