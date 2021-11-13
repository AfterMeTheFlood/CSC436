import React, { useContext } from "react";
import { StateContext } from "./Contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const todos = Array.isArray(state.todos) ? state.todos : [];
  return (
    <div>
      {todos.length > 0 &&
        todos.map((p, i) => (
          <>
            <Todo {...p} key={"todo-" + i} />
            <br />
          </>
        ))}
    </div>
  );
}
