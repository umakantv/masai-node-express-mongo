import React, { useState } from "react";
import { Card, Input, Button } from "antd";


async function register(body) {

  body.image = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/495.jpg"

  body = JSON.stringify({
    user: body
  });

  console.log(body);
  const response = await fetch(
    `http://43.205.98.42:3001/users`, {
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


export default function Register({ setFlow }) {
  const [name, setName] = useState("Umakant");
  const [email, setEmail] = useState("bitop16986@chimpad.com");
  const [password, setPassword] = useState("password");

  const onRegister = () => {
    register({name, email, password})
    .then(() => {
      alert("Registration successful")
    })
    .catch(err => {
      alert(err.message)
    })
  }

  return (
    <Card>
      <h2>Register </h2>
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
      <Button type="primary" onClick={onRegister}>Register</Button>
      <Button type="link" onClick={() => setFlow("login")}>
        Login Instead
      </Button>
    </Card>
  );
}
