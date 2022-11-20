import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { getRelativeTime } from "../Utils/Timestamp";
import { Button } from "@mui/material";
import FollowingContext from "../../contexts/following";

function AccountInfo({ user, timestamp }) {
  const { followingUser, followUser, unfollowUser, following } =
    useContext(FollowingContext);

  if (!user) return "";

  const alreadyFollow = followingUser(user._id);

  return (
    <Stack direction="row" spacing={2} style={{ margin: "10px 0" }}>
      <Avatar alt={user?.name} src={user?.image} />
      <Stack>
        <Typography variant="body1">{user?.name}</Typography>
        {timestamp && (
          <Typography variant="caption">
            {getRelativeTime(timestamp)}
          </Typography>
        )}
      </Stack>
      <div>
        {alreadyFollow ? (
          <Button
            size="small"
            variant="outlined"
            onClick={() => unfollowUser(user._id)}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            onClick={() => followUser(user._id)}
          >
            Follow
          </Button>
        )}
      </div>
    </Stack>
  );
}

export default AccountInfo;
