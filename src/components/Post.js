import React, { useContext } from "react";
import PostsContext from "../context/posts.context";

const Post = ({ post }) => {
  const { postsDispatch } = useContext(PostsContext);

  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button
        onClick={() =>
          postsDispatch({
            type: "REMOVE_POST",
            title: post.title,
          })
        }
      >
        Remove
      </button>
      <button>Edit</button>
    </>
  );
};

export { Post as default };
