import React, { useState } from "react";
import UserBar from "./user/UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

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

  const [todos, setTodoList] = useState(initialTodos);

  function createTodo(title, description) {
    const newTodo = {
      id: todos.length + 1,
      title,
      description,
      complete: false,
      dateCreated: Date.now(),
    };
    setTodoList([...todos, newTodo]);
  }

  function toggleTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        let dateCompleted = null;
        if (!todo.complete) {
          dateCompleted = Date.now();
        }
        return { ...todo, complete: !todo.complete, dateCompleted };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <UserBar />
      <br />
      <br />
      <hr />
      <br />
      <CreateTodo createTodo={createTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
