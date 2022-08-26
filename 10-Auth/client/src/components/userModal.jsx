import { Avatar, Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import AuthContext from "../Auth";
import Login from "./login";
import Register from "./register";
import AccountMenu from "./userAccountMenu";
import GoogleSignin from "./googleSignin";
import GithubSignin from "./githubSignin";

const UserModal = () => {
  const {user, showUserModal, setShowUserModal} = useContext(AuthContext)
  const [flow, setFlow] = useState("login");

  const showModal = () => {
    setShowUserModal(true);
  };

  const handleOk = () => {
    setShowUserModal(false);
  };

  const handleCancel = () => {
    setShowUserModal(false);
  };

  return (
    <>
      {user ? <AccountMenu /> : <Button type="primary" onClick={showModal}>
        Login
      </Button>}
      <Modal
        title={flow === "login" ? 'Login': 'Register'}
        visible={showUserModal}
        onOk={null}
        onCancel={handleCancel}
      >
        {flow === "login" ? (
          <Login setFlow={setFlow} />
        ) : (
          <Register setFlow={setFlow} />
        )}

        <div style={{margin: '10px 0'}}>
          <GoogleSignin />
        </div>
        <div>
          <GithubSignin />
        </div>
      </Modal>
    </>
  );
};

export default UserModal;
