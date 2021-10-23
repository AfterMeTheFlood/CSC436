import React, { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function CreateTodo() {
  const { state, dispatch } = useContext(StateContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [todo, createTodo] = useResource(
    ({ title, content, author, createdOn, complete, completedOn }) => ({
      url: "/todos",
      method: "post",
      data: { title, content, author, createdOn, complete, completedOn },
    })
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title can not be empty!");
      return;
    }

    const createdOn = new Date();
    createTodo({
      title,
      content,
      author: state.user,
      createdOn,
      complete: false,
      completedOn: null,
    });
    dispatch({
      type: "CREATE_TODO",
      title,
      content,
      author: state.user,
      createdOn,
      complete: false,
      completedOn: null,
    });
    setTitle("");
    setContent("");
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeContent(e) {
    setContent(e.target.value);
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
        <label htmlFor="create-content">Content:</label>
        <input
          type="text"
          name="create-content"
          id="create-content"
          value={content}
          onChange={handleChangeContent}
        />
      </div>
      <input type="submit" value="Create" />
    </form>
  );
}
