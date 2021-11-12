import React, { useContext } from "react";
import { Link } from "react-navi";
import { StateContext } from "../Contexts";

export default function UserList() {
  const { state } = useContext(StateContext);
  const { users } = state;
  return (
    <>
      <Link href="/">Go to all todos</Link>
      <div>
        {users.map((user, id) => (
          <div key={id}>
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
