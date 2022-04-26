import React, { useContext } from "react";
import PostsContext from "../context/posts.context";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removePost } from "../actions/posts";

const PostPage = () => {
  const { postsDispatch } = useContext(PostsContext);
  const navigate = useNavigate();
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
                  onClick={async () => {
                    console.log(post);
                    let result = await fetch(
                      `http://localhost:3000/posts/${post.id}`,
                      {
                        method: "delete",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    result = await result.json().then(() => {
                      postsDispatch(removePost(post.id));
                      navigate("/");
                    });
                  }}
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
