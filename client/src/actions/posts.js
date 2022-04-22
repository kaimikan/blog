import { v4 as uuidv4 } from "uuid";

export const addPost = (title, body) => ({
  type: "ADD_POST",
  id: uuidv4(),
  title: title,
  body: body,
});

export const editPost = (id, title, body) => ({
  type: "EDIT_POST",
  id: id,
  updates: {
    title: title,
    body: body,
  },
});

export const removePost = (id) => ({
  type: "REMOVE_POST",
  id: id,
});
