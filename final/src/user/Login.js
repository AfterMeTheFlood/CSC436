import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";

export default function Login() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [user, login] = useResource((username, password) => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: "get",
  }));
  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false);
        dispatch({ type: "LOGIN", username: user.data[0].username });
      } else {
        setLoginFailed(true);
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
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
    </form>
  );
}
