import React, { useContext } from "react";
import { StateContext } from "./Contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const todos = state.todos;
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} title={p.title} author={p.author} key={"post-" + i} />
      ))}
    </div>
  );
}
