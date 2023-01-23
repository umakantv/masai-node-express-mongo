import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getUser } from "../../api/user";

export default function AccountDetailsCard({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    getUser(userId).then((res) => setUser(res.data.data));
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [userId]);

  if (!user) return "";

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={2} style={{ margin: "10px 0" }}>
          <Avatar alt={user?.name} src={user?.image} />
          <Stack>
            <Typography variant="body1">{user?.name}</Typography>
          </Stack>
        </Stack>

        <Typography>{user.postCount} Posts</Typography>
      </CardContent>
    </Card>
  );
}
