import React, { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    props.login(username, password);
    setUsername("");
    setPassword("");
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        onChange={handleChangeUsername}
      />
      <label htmlFor="login-password">Password:</label>
      <input
        type="password"
        name="login-password"
        id="login-password"
        onChange={handleChangePassword}
      />
      <input type="submit" value="Login" />
    </form>
  );
}
