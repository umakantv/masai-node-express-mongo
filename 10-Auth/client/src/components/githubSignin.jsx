import React from "react";
import { Space, Button } from "antd";

export default function GoogleSignin() {

  return (
    <Space direction="vertical">
      <Button type="link" onClick={() => window.location = 'https://github.com/login/oauth/authorize?client_id=72e71aa44baa188dd4dd'}>
        Sign In with Github
      </Button>
    </Space>
  );
}
