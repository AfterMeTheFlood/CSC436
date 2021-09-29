import React, { useState } from "react";

import Logout from "./Logout";
import Register from "./Register";
import Login from "./Login";

export default function UserBar() {
  const [username, setUser] = useState("");
  // const [user, userRegister] = useState("");

  function login(username, password) {
    setUser(username);
  }
  function register(username, password, passwordRepeat) {
    setUser(username);
  }
  function logout(username, password) {
    setUser("");
  }

  if (username) {
    return <Logout user={username} logout={logout} />;
  } else {
    return (
      <>
        <Login login={login} />
        <Register register={register} />
      </>
    );
  }
}
