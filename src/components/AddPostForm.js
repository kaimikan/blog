import React, { useContext, useState } from "react";
import PostsContext from "../context/posts.context";
import DataContext from "../context/data.context";
import PostForm from "./PostForm";
import { v4 as uuidv4 } from "uuid";

const AddPostForm = () => {
  const { postsDispatch } = useContext(PostsContext);
  const { title, setTitle, body, setBody } = useContext(DataContext);

  const addPost = (e) => {
    e.preventDefault();
    postsDispatch({
      type: "ADD_POST",
      id: uuidv4(),
      title: title,
      body: body,
    });
    setTitle("");
    setBody("");
  };

  return (
    <>
      <p>Write Post:</p>
      <DataContext.Provider value={{ title, setTitle, body, setBody }}>
        <PostForm onSubmitMethod={addPost} />
      </DataContext.Provider>
    </>
  );
};

export { AddPostForm as default };
