import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import DataContext from "../context/data.context";
import PostForm from "./PostForm";
import { useLocation } from "react-router-dom";

const EditPostForm = (props) => {
  const { postsDispatch } = useContext(PostsContext);
  const { title, setTitle, body, setBody } = useContext(DataContext);

  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const post = {
    id: location.state?.id,
    title: location.state?.title,
    body: location.state?.body,
  };
  console.log("PASSING", post);

  const editPost = (e) => {
    e.preventDefault();
    postsDispatch({
      type: "EDIT_POST",
      id: post.id,
      updates: {
        title: title,
        body: body,
      },
    });
    setTitle("");
    setBody("");
  };

  return (
    <>
      <p>Edit Post:</p>
      <DataContext.Provider
        value={{
          title: title,
          body: body,
          post: post,
          setTitle,
          setBody,
        }}
      >
        <PostForm onSubmitMethod={editPost} />
      </DataContext.Provider>
    </>
  );
};

export { EditPostForm as default };
