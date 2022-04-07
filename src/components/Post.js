import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { postsDispatch } = useContext(PostsContext);

  console.log("POST OBJECT: ", post);

  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button
        onClick={() =>
          postsDispatch({
            type: "REMOVE_POST",
            id: post.id,
          })
        }
      >
        Remove
      </button>
      <Link
        to={"/edit/" + post.id}
        state={{ id: post.id, title: post.title, body: post.body }}
      >
        Edit
      </Link>
    </>
  );
};

export { Post as default };
