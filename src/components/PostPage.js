import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { removePost } from "../actions/posts";

const PostPage = () => {
  const { postsDispatch } = useContext(PostsContext);

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const post = {
    id: location.state?.id,
    title: location.state?.title,
    body: location.state?.body,
  };
  console.log("POST OBJECT: ", post);

  return (
    <>
      <div>
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__content">
              <h2 className="page-header__title">{post.title}</h2>
              <div className="page-header__actions">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="list-item">
        <div>
          <h4 className="list-item__data">{post.body}</h4>
        </div>
      </div>
    </>
  );
};

export { PostPage as default };
