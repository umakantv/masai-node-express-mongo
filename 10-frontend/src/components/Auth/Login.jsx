import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import AuthContext from "../../contexts/auth";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

export default function Login() {
  const { user, login, showLoginForm, setShowLoginForm } =
    useContext(AuthContext);
  const [email, setEmail] = useState("varun.singh@gmail.com");
  const [password, setPassword] = useState("password");

  const handleClose = () => {
    setShowLoginForm(false);
  };

  return (
    <div>
      <Dialog open={showLoginForm} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => login(email, password)}>Login</Button>
        </DialogActions>

        <Divider />
        <DialogContent>
          <a href="https://github.com/login/oauth/authorize?client_id=5832e06e94cb19b8f146">
            Login With Github
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
