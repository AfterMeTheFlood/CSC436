import React, { useState, useContext } from "react";
import { StateContext } from "./Contexts";

export default function CreateTodo() {
  const { dispatch } = useContext(StateContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title can not be empty!");
      return;
    }
    console.log("title:", title);
    console.log("description:", description);
    dispatch({
      type: "CREATE_TODO",
      title,
      description,
    });
    setTitle("");
    setDescription("");
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        <label htmlFor="create-description">Description:</label>
        <input
          type="text"
          name="create-description"
          id="create-description"
          value={description}
          onChange={handleChangeDescription}
        />
      </div>
      <input type="submit" value="Create" />
    </form>
  );
}
