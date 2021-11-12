import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import TodoList from "./TodoList";
import { StateContext } from "./Contexts";

export default function Home() {
  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  const [users, getUsers] = useResource(() => ({
    url: "/users",
    method: "get",
  }));

  const { state, dispatch } = useContext(StateContext);

  useEffect(getTodos, []);
  useEffect(getUsers, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data });
    }
  }, [todos]);

  useEffect(() => {
    if (users && users.data) {
      console.log(users.data);
      dispatch({ type: "FETCH_USERS", users: users.data });
    }
  }, [users]);

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Todo`;
    } else {
      document.title = "Todo";
    }
  }, [user]);

  return (
    <>
      <Link href="/users">Go to user list</Link>
      <TodoList />
    </>
  );
}
