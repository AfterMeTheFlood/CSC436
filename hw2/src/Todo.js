import React from "react";

export default function Todo({
  id,
  title,
  description,
  dateCreated,
  complete,
  dateCompleted,
  toggleTodo,
}) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="checkbox"
          checked={complete || false}
          onChange={() => toggleTodo(id)}
        />
        <label htmlFor="complete">complete</label>
      </div>
      <i>
        Description: <b>{description}</b>
      </i>
      <div>dateCreated: {dateCreated}</div>
      <div>dateCompleted: {dateCompleted}</div>
      <br />
    </div>
  );
}
