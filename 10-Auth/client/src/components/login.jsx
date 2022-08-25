import React, { useState } from "react";
import { Space, Input, Button, notification } from "antd";
import userApi from "../api/user";

export default function Login({ setFlow }) {
  const [email, setEmail] = useState("bitop16986@chimpad.com");
  const [password, setPassword] = useState("password");

  const onLogin = () => {
    userApi.login({ email, password})
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
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button type="primary" onClick={onLogin}>Login</Button>
        <Button type="link" onClick={() => setFlow("register")}>
          Register Instead
        </Button>
      </div>
    </Space>
  );
}
