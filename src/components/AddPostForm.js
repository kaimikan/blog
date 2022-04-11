import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import DataContext from "../context/data.context";
import PostForm from "./PostForm";
import { addPost } from "../actions/posts";

const AddPostForm = () => {
  const { postsDispatch } = useContext(PostsContext);
  const { title, setTitle, body, setBody } = useContext(DataContext);

  const addPostEvent = (e) => {
    e.preventDefault();
    postsDispatch(addPost(title, body));
    setTitle("");
    setBody("");
  };

  return (
    <>
      <p>Write Post:</p>
      <DataContext.Provider value={{ title, setTitle, body, setBody }}>
        <PostForm onSubmitMethod={addPostEvent} />
      </DataContext.Provider>
    </>
  );
};

export { AddPostForm as default };
