import React, { useContext } from "react";
import { useResource } from "react-request-hook";
import { Card, Button, Form } from "react-bootstrap";
import { StateContext } from "./Contexts";

export default function Todo({
  _id,
  title,
  content,
  author,
  createdOn,
  complete,
  completedOn,
}) {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todoUpdate, updateTodo] = useResource(
    ({ _id, complete, completedOn }) => ({
      url: `/todo/${_id}`,
      method: "put",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, content, author, createdOn, complete, completedOn },
    })
  );

  function handleUpdate() {
    if (user.username !== author) {
      return;
    }
    const completedOn = new Date();
    updateTodo({
      _id,
      title,
      content,
      author,
      complete: !complete,
      completedOn: complete ? null : completedOn,
    });
    dispatch({
      type: "TOGGLE_TODO",
      _id: _id,
      complete: !complete,
      completedOn,
    });
  }

  const [todoDelete, deleteTodo] = useResource(({ _id }) => ({
    url: `/todo/${_id}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  function handleDelete() {
    if (user.username !== author) {
      return;
    }

    deleteTodo({
      _id: _id,
    });
    dispatch({ type: "DELETE_TODO", _id: _id });
  }

  return (
    <Card>
      <Card.Body>
        {user.username && (
          <Form.Check
            type="checkbox"
            inline
            checked={complete || false}
            onChange={handleUpdate}
            label={<Card.Title>{title}</Card.Title>}
          />
        )}

        <Card.Subtitle>
          <i>
            Written by <b>{author}</b>
          </i>
        </Card.Subtitle>
        <Card.Text>
          Content: <b>{content}</b>
        </Card.Text>
        {createdOn && (
          <>
            <i>
              Created on:{" "}
              {createdOn ? new Date(createdOn).toLocaleDateString("en-us") : ""}
            </i>
            <br />
          </>
        )}
        {complete && (
          <>
            <i>
              Completed on:{" "}
              {completedOn
                ? new Date(completedOn).toLocaleDateString("en-us")
                : ""}
            </i>
            <br />
          </>
        )}
        {user.username && (
          <Button variant="link" onClick={handleDelete}>
            Delete Post
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
