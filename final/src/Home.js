import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import { StateContext } from "./Contexts";

export default function Home() {
  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [users, getUsers] = useResource(() => ({
    url: "/auth",
    method: "get",
  }));

  const { state, dispatch } = useContext(StateContext);

  useEffect(getTodos, [state.user.access_token]);
  useEffect(getUsers, []);

  useEffect(() => {
    if (todos && todos.data) {
      console.log("todos.data: ", todos.data);
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos });
    }
  }, [todos]);

  useEffect(() => {
    if (users && users.data) {
      console.log("users.data: ", users.data);
      dispatch({ type: "FETCH_USERS", users: users.data.users });
    }
  }, [users]);

  const { user } = state;

  useEffect(() => {
    if (user.username) {
      document.title = `${user.username}'s Todo`;
    } else {
      document.title = "Todo";
    }
  }, [user]);

  return (
    <>
      <Link href="/users">Go to user list</Link>
      {user.username && <CreateTodo />}
      <TodoList />
    </>
  );
}
