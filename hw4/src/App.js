import React, { useReducer, useEffect } from "react";
import UserBar from "./user/UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import appReducer from "./reducers";
import { StateContext } from "./Contexts";

function App() {
  const initialTodos = [
    {
      id: 1,
      title: "Todo 1",
      description: "Todo 1 description",
      dateCreated: Date.now(),
      complete: true,
      dateCompleted: Date.now(),
    },
    {
      id: 2,
      title: "Todo 2",
      description: "Todo 2 description",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "Todo 3 description",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
  ];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });
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
        <UserBar />
        <br />
        <br />
        <hr />
        <br />
        {user && <CreateTodo />}
        <TodoList />
      </StateContext.Provider>
    </div>
  );
}

export default App;
