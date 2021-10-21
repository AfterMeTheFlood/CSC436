import React from "react";

export default function Todo({
  id,
  title,
  description,
  dateCreated,
  complete,
  dateCompleted,
  dispatchTodo,
}) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="checkbox"
          checked={complete || false}
          onChange={() => dispatchTodo({ type: "TOGGLE_TODO", id })}
        />
        <label htmlFor="complete">complete</label>
      </div>
      <i>
        Description: <b>{description}</b>
      </i>
      <div>dateCreated: {dateCreated}</div>
      <div>dateCompleted: {dateCompleted}</div>
      <button
        type="button"
        onClick={() => dispatchTodo({ type: "DELETE_TODO", id })}
      >
        Delete
      </button>
      <br />
    </div>
  );
}
