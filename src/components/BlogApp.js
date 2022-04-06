import React, { useEffect, useReducer } from "react";
import postsReducer from "../reducers/posts";
import Header from "./Header";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";
import PostsContext from "../context/posts.context";

const BlogApp = () => {
  const [postsState, postsDispatch] = useReducer(postsReducer, []);

  useEffect(() => {
    const postsLocalData = JSON.parse(
      localStorage.getItem("postsLocalStorage")
    );

    if (postsLocalData)
      postsDispatch({
        type: "POPULATE_NOTES",
        posts: postsLocalData,
      });
  });

  useEffect(() => {
    localStorage.setItem("postsLocalStorage", JSON.stringify(postsState));
  }, [postsState]);

  return (
    <>
      <Header />
      <PostsContext.Provider value={{ postsState, postsDispatch }}>
        <AddPostForm />
        <PostList />
      </PostsContext.Provider>
    </>
  );
};

export { BlogApp as default };
