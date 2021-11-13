import React, { useContext } from "react";
import { Link } from "react-navi";
import { StateContext } from "../Contexts";

export default function UserList() {
  const { state } = useContext(StateContext);
  console.log("state.users: ", state.users);
  const users = Array.isArray(state.users) ? state.users : [];
  return (
    <>
      <Link href="/">Go to all todos</Link>
      <div>
        {users.map((user, id) => (
          <div key={id}>
            <Link href={`/users/${user._id}`}>{user.username}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
