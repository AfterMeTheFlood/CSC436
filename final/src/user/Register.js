import React, { useState, useContext, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";

export default function Register({ show, handleClose }) {
  const { dispatch } = useContext(StateContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });

  const [user, register] = useResource((username, password) => ({
    url: "/users",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.username });
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username.trim()) {
      alert("Username can not be empty!");
      return;
    }
    if (!formData.password.trim() || !formData.passwordRepeat.trim()) {
      alert("Password can not be empty!");
      return;
    }
    register(formData.username, formData.password);
    handleClose();
  }

  function handleChangeUsername(e) {
    setFormData({ ...formData, username: e.target.value });
  }

  function handleChangePassword(e) {
    setFormData({ ...formData, password: e.target.value });
  }

  function handleChangePasswordRepeat(e) {
    setFormData({ ...formData, passwordRepeat: e.target.value });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="register-username">Username:</Form.Label>
          <Form.Control
            type="text"
            value={formData.username}
            onChange={handleChangeUsername}
            name="register-username"
            id="register-username"
          />
          <Form.Label htmlFor="register-password">Password:</Form.Label>
          <Form.Control
            type="password"
            name="register-password"
            id="register-password"
            value={formData.password}
            onChange={handleChangePassword}
          />
          <Form.Label htmlFor="register-password-repeat">
            Repeat password:
          </Form.Label>
          <Form.Control
            type="password"
            name="register-password-repeat"
            id="register-password-repeat"
            value={formData.passwordRepeat}
            onChange={handleChangePasswordRepeat}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={
              formData.username.length === 0 ||
              formData.password.length === 0 ||
              formData.password !== formData.passwordRepeat
            }
          >
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
