import React from "react";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { loginWithGithubApi } from "../../api/user";
import Typography from "@mui/material/Typography";
import { toast } from 'react-toastify';

export default function GithubSignin() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      loginWithGithubApi(code)
      .then((response) => {
        const token = response.data.data.token;

        localStorage.setItem("auth-token", token);

        window.location = "/";
      })
      .catch(err => {
        toast('Error while logging you in with github', {
          type: 'error'
        })
      });;
    }
  }, [code]);

  return (
    <CardContent>
      <CircularProgress />
      <Typography>Logging you in with GitHub</Typography>
    </CardContent>
  );
}
