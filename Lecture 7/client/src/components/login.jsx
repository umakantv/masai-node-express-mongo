import React, { useState } from "react";
import { Card, Input, Button, notification } from "antd";


async function login(body) {

  body = JSON.stringify(body);

  const response = await fetch(
    `http://localhost:3001/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body,
    }
  )

  const data = await response.json();

  return data;
}

export default function Login({ setFlow }) {
  const [email, setEmail] = useState("bitop16986@chimpad.com");
  const [password, setPassword] = useState("password");

  const onLogin = () => {
    login({ email, password})
    .then((data) => {
      console.log(data)
      const {token} = data.data

      localStorage.setItem("token", token);

      window.location.reload();
      // alert("Login successful")
    })
    .catch(err => {
      alert(err.message)
    })
  }

  return (
    <Card>
      <h2>Login </h2>
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
      <Button type="primary" onClick={onLogin}>Login</Button>
      <Button type="link" onClick={() => setFlow("register")}>
        Register Instead
      </Button>
    </Card>
  );
}
