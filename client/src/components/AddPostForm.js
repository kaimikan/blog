import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostsContext from "../context/posts.context";
import DataContext from "../context/data.context";
import PostForm from "./PostForm";
import { addPost } from "../actions/posts";

const AddPostForm = () => {
  const { postsDispatch } = useContext(PostsContext);
  const { title, setTitle, body, setBody } = useContext(DataContext);
  const navigate = useNavigate();

  const addPostEvent = async (e) => {
    e.preventDefault();
    postsDispatch(addPost(title, body));
    let result = await fetch("http://localhost:3000/post", {
      method: "post",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setTitle("");
      setBody("");
      navigate("/");
    });
    result = await result.json();
  };

  return (
    <>
      <div className="page-header">
        <div className="content-container">
          <h2 className="page-header__title">Write Post</h2>
        </div>
      </div>
      <DataContext.Provider value={{ title, setTitle, body, setBody }}>
        <PostForm onSubmitMethod={addPostEvent} />
      </DataContext.Provider>
    </>
  );
};

export { AddPostForm as default };
