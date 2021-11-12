import React, { useContext } from "react";
import { useResource } from "react-request-hook";
import { Card, Button, Form } from "react-bootstrap";
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
    <Card>
      <Card.Body>
        <Form.Check
          type="checkbox"
          inline
          checked={complete || false}
          onChange={handleUpdate}
          label={<Card.Title>{title}</Card.Title>}
        />
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
        <Button variant="link" onClick={handleDelete}>
          Delete Post
        </Button>
      </Card.Body>
    </Card>
  );
}
