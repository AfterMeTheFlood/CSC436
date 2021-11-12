import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";

export default function Register() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

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
    if (!username.trim()) {
      alert("Username can not be empty!");
      return;
    }
    if (!password.trim() || !passwordRepeat.trim()) {
      alert("Password can not be empty!");
      return;
    }
    register(username, password);
    setUsername("");
    setPassword("");
    setPasswordRepeat("");
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangePasswordRepeat(e) {
    setPasswordRepeat(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        name="register-username"
        id="register-username"
        onChange={handleChangeUsername}
      />

      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        onChange={handleChangePassword}
      />

      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        onChange={handleChangePasswordRepeat}
      />

      <input type="submit" value="Register" />
    </form>
  );
}
