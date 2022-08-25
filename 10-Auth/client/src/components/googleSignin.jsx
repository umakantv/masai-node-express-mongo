import React from "react";
import { Space, notification } from "antd";
import userApi from "../api/user";
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleSignin() {

  const onLogin = (token) => {
    userApi.googleSignin({ token })
    .then((data) => {
      console.log(data)
      const {token} = data.data

      localStorage.setItem("token", token);

      window.location.reload();
      // alert("Login successful")
    })
    .catch(err => {
      notification.error(err.message)
    })
  }

  return (
    <Space direction="vertical">
      <GoogleLogin
        onSuccess={credentialResponse => {
          onLogin(credentialResponse.credential);
        }}
        onError={() => {
          notification.error('Login Failed.')
        }}
      />
    </Space>
  );
}
