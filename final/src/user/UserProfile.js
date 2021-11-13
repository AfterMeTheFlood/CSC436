import React, { useContext } from "react";
import { Link } from "react-navi";
import { StateContext } from "../Contexts";
import Todo from "../Todo";

export default function UserProfile({ userId }) {
  const { state } = useContext(StateContext);
  const { users } = state;
  const user = users.find((user) => user._id && user._id.toString() === userId);
  const todos = user
    ? state.todos.filter((todo) => todo.author === user.username)
    : [];
  return (
    <>
      <Link href="/users">Go to user list</Link>
      <div>
        {todos.map((p, i) => (
          <Todo {...p} title={p.title} author={p.author} key={"post-" + i} />
        ))}
      </div>
    </>
  );
}
