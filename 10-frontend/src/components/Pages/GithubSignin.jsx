import React from "react";
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { loginWithGithubApi } from "../../api/user";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";

export default function GithubSignin() {
  
  const {setShowLoginForm} = useContext(AuthContext);
  
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  
  useEffect(() => {
    if (code) {
      loginWithGithubApi(code)
      .then(response => {
        const token = response.data.data.token

        localStorage.setItem('auth-token', token);

        setShowLoginForm(false);
      })
    }
  }, [code])

  return (
    <Card>
      
    </Card>
  );
}
