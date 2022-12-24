import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { getRelativeTime } from "../Utils/Timestamp";

function AccountInfo({ user, timestamp }) {
  if (!user) return "";

  return (
    <Stack direction="row" spacing={2} style={{ margin: "10px 0" }}>
      <Avatar alt={user?.name} src={user?.image} />
      <Stack style={{ flex: 1 }}>
        <Typography variant="body1">{user?.name}</Typography>
        {timestamp && (
          <Typography variant="caption">
            {getRelativeTime(timestamp)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default AccountInfo;
