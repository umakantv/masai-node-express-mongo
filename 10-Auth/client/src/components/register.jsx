import React, { useState } from "react";
import { Space, Input, Button, notification } from "antd";
import userApi from "../api/user";

export default function Register({ setFlow }) {
  const [name, setName] = useState("Umakant");
  const [email, setEmail] = useState("bitop16986@chimpad.com");
  const [password, setPassword] = useState("password");

  const onRegister = () => {
    userApi.register({
      user: {name, email, password}
    })
    .then(() => {
      notification.info("Registration successful")
    })
    .catch(err => {
      notification.error(err.message)
    })
  }

  return (
    <Space direction="vertical">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        <Button type="primary" onClick={onRegister}>Register</Button>
        <Button type="link" onClick={() => setFlow("login")}>
          Login Instead
        </Button>
      </div>
    </Space>
  );
}
