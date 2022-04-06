import React from "react";
import Header from "./Header";
import AddPostForm from "./AddPostForm";
import PostList from "./PostList";

const BlogApp = () => {
  return (
    <>
      <Header />
      <AddPostForm />
      <PostList />
    </>
  );
};

export { BlogApp as default };
