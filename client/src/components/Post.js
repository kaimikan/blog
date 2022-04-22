import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import { Link } from "react-router-dom";
import { removePost } from "../actions/posts";

const Post = ({ post }) => {
  const { postsDispatch } = useContext(PostsContext);

  console.log("POST OBJECT: ", post);

  return (
    <div className="list-item">
      <div>
        <h3 className="list-item__title">
          <Link
            className="link"
            to={"/post/" + post.id}
            state={{ id: post.id, title: post.title, body: post.body }}
          >
            {post.title}
          </Link>
        </h3>
        <span className="list-item__subtitle">{post.body}</span>
      </div>
      {/* <div className="list-item__actions">
        <button
          className="button button--secondary"
          onClick={() => postsDispatch(removePost(post.id))}
        >
          Remove
        </button>
        <Link
          to={"/edit/" + post.id}
          state={{ id: post.id, title: post.title, body: post.body }}
        >
          <button className="button button--secondary-2">Edit</button>
        </Link>
      </div> */}
    </div>
  );
};

export { Post as default };
