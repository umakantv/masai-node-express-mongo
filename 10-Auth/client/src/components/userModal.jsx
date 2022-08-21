import { Avatar, Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import AuthContext from "../Auth";
import Login from "./login";
import Register from "./register";
import AccountMenu from "./userAccountMenu";

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
        title="Basic Modal"
        visible={showUserModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {flow === "login" ? (
          <Login setFlow={setFlow} />
        ) : (
          <Register setFlow={setFlow} />
        )}
      </Modal>
    </>
  );
};

export default UserModal;
