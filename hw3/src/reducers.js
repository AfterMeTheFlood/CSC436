function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todosReducer(state, action) {
  const todos = state;
  switch (action.type) {
    case "CREATE_TODO":
      const curLength = todos.length ? todos.length : 0;
      const newTodo = {
        id: curLength + 1,
        title: action.title,
        description: action.description,
        complete: false,
        dateCreated: Date.now(),
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      let updatedTodos = [];
      todos.forEach((todo) => {
        if (action.id === todo.id) {
          updatedTodos.push({
            ...todo,
            complete: !todo.complete,
            dateCompleted: todo.complete ? null : Date.now(),
          });
        } else {
          updatedTodos.push(todo);
        }
      });
      return updatedTodos;
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todosReducer(state.todos, action),
  };
}
