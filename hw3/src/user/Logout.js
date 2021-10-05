import React from "react";

export default function Logout({ user, logout }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Logged in as: <b>{user}</b>
      <input type="submit" value="Logout" onClick={logout} />
    </form>
  );
}
