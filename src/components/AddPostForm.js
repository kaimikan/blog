import React, { useContext, useState } from "react";
import PostsContext from "../context/posts.context";

const AddPostForm = () => {
  const { postsDispatch } = useContext(PostsContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addPost = (e) => {
    e.preventDefault();
    postsDispatch({
      type: "ADD_POST",
      title: title,
      body: body,
    });
    setTitle("");
    setBody("");
  };

  return (
    <>
      <p>Write Post:</p>
      <form onSubmit={addPost}>
        <input
          value={title}
          placeholder={"Title"}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={body}
          placeholder={"Body"}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Publish</button>
      </form>
    </>
  );
};

export { AddPostForm as default };
