import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import AuthContext from "../../contexts/auth";
import Divider from "@mui/material/Divider";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import config from "../../config";

export default function Login() {
  const { showLoginForm, setShowLoginForm } = useContext(AuthContext);
  const [formType, setFormType] = useState("login");

  const handleClose = () => {
    setShowLoginForm(false);
  };

  return (
    <div>
      <Dialog open={showLoginForm} onClose={handleClose}>
        {formType === "login" ? (
          <>
            <DialogTitle>Login</DialogTitle>
            <LoginForm />
          </>
        ) : (
          <>
            <DialogTitle>Sign Up</DialogTitle>
            <RegisterForm setFormType={setFormType} />
          </>
        )}

        <Divider />
        <DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setFormType(formType === "login" ? "register" : "login")
              }
            >
              {formType === "login" ? "Sign Up" : "Login"}
            </Button>
            <a href={`https://github.com/login/oauth/authorize?client_id=${config.GITHUB_OAUTH_CLIENT_ID}`}>
              <Button>Login With Github</Button>
            </a>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
