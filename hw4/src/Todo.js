import React, { useContext } from "react";
import { StateContext } from "./Contexts";

export default function Todo({
  id,
  title,
  description,
  dateCreated,
  complete,
  dateCompleted,
}) {
  const { dispatch } = useContext(StateContext);
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="checkbox"
          checked={complete || false}
          onChange={() => dispatch({ type: "TOGGLE_TODO", id })}
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
        onClick={() => dispatch({ type: "DELETE_TODO", id })}
      >
        Delete
      </button>
      <br />
    </div>
  );
}
