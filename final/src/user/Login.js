import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { Modal, Form, Button } from "react-bootstrap";
import { StateContext } from "../Contexts";

export default function Login({ show, handleClose }) {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));
  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        console.log(user.data);
        dispatch({
          type: "LOGIN",
          username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      alert("Username can not be empty!");
      return;
    }
    if (!password.trim()) {
      alert("Password can not be empty!");
      return;
    }
    login(username, password);
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="login-username">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleChangeUsername}
            name="login-username"
            id="login-username"
          />
          <Form.Label htmlFor="login-password">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handleChangePassword}
            name="login-password"
            id="login-password"
          />
          {loginFailed && (
            <Form.Text style={{ color: "red" }}>
              Invalid username or password
            </Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={username.length === 0}
            type="submit"
          >
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
