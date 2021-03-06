import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import DataContext from "../context/data.context";
import PostForm from "./PostForm";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../actions/posts";

const EditPostForm = (props) => {
  const { postsDispatch } = useContext(PostsContext);
  const { title, setTitle, body, setBody } = useContext(DataContext);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const post = {
    id: location.state?.id,
    title: location.state?.title,
    body: location.state?.body,
  };
  console.log("PASSING", post);

  const editPostEvent = async (e) => {
    e.preventDefault();
    postsDispatch(editPost(post.id, title, body));
    let result = await fetch(`http://localhost:3000/postedit/${post.id}`, {
      method: "post",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
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
          <h2 className="page-header__title">Edit Post</h2>
        </div>
      </div>
      <DataContext.Provider
        value={{
          title: title,
          body: body,
          post: post,
          setTitle,
          setBody,
        }}
      >
        <PostForm onSubmitMethod={editPostEvent} />
      </DataContext.Provider>
    </>
  );
};

export { EditPostForm as default };
