import React, { useContext, useEffect } from "react";
import DataContext from "../context/data.context";

const PostForm = ({ onSubmitMethod }) => {
  // ADD
  const { post, title, setTitle, body, setBody } = useContext(DataContext);
  // EDIT
  console.log("Title: ", title, "Body: ", body);
  console.log("POST", post);

  useEffect(() => {
    if (post !== undefined) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, []);

  return (
    <form onSubmit={onSubmitMethod} className="form">
      <input
        value={title}
        className="text-input"
        placeholder={"Title"}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        value={body}
        className="textarea"
        placeholder={"Body"}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <button className="button">Save</button>
    </form>
  );
};

export { PostForm as default };
