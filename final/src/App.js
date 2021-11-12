import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserBar from "./user/UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import appReducer from "./reducers";
import { StateContext } from "./Contexts";

function App() {
  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data });
    }
  }, [todos]);

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Todo`;
    } else {
      document.title = "Todo";
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Container>
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          <br />
          <br />
          <hr />
          <br />
          {user && <CreateTodo />}
          <TodoList />
        </Container>
      </StateContext.Provider>
    </div>
  );
}

export default App;
