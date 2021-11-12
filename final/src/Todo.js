import React, { useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function Todo({
  id,
  title,
  content,
  author,
  createdOn,
  complete,
  completedOn,
}) {
  const { dispatch } = useContext(StateContext);

  const [todoUpdate, updateTodo] = useResource(
    ({ id, complete, completedOn }) => ({
      url: `/todos/${id}`,
      method: "put",
      data: { title, content, author, createdOn, complete, completedOn },
    })
  );

  function handleUpdate() {
    const completedOn = new Date();
    updateTodo({
      id,
      complete: !complete,
      completedOn: complete ? null : completedOn,
    });
    dispatch({ type: "TOGGLE_TODO", id, complete: !complete, completedOn });
  }

  const [todoDelete, deleteTodo] = useResource(({ id }) => ({
    url: `/todos/${id}`,
    method: "delete",
  }));

  function handleDelete() {
    deleteTodo({
      id,
    });
    dispatch({ type: "DELETE_TODO", id });
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="checkbox"
          checked={complete || false}
          onChange={handleUpdate}
        />
        <label htmlFor="complete">complete</label>
      </div>
      <i>
        Content: <b>{content}</b>
      </i>
      <div>
        Date Created:
        {createdOn ? new Date(createdOn).toLocaleDateString("en-us") : ""}
      </div>
      <div>
        Date Completed:
        {completedOn ? new Date(completedOn).toLocaleDateString("en-us") : ""}
      </div>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <br />
    </div>
  );
}
