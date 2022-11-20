import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getRelativeTime } from "../Utils/Timestamp";

function AccountInfo({ user, timestamp }) {
  if (!user) return "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar alt={user?.name} src={user?.image} />
      <div style={{ marginLeft: 10 }}>
        <Typography variant="body1">{user?.name}</Typography>
        {timestamp && (
          <Typography variant="caption">
            {getRelativeTime(timestamp)}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
