import React, { useContext } from "react";
import Post from "./Post";
import PostsContext from "../context/posts.context";

const PostList = () => {
  const { postsState } = useContext(PostsContext);
  /* const samplePosts = [
    {
      title: "First Note",
      body: "Body of the first note.",
    },
    {
      title: "Second Note",
      body: "Body of the second note.",
    },
    {
      title: "Third Note",
      body: "Body of the third note.",
    },
  ]; */

  console.log("POST LIST: ", postsState.length);

  if (postsState.length > 0) {
    return /* samplePosts */ postsState.map((post) => (
      <Post key={post.title} post={post} />
    ));
  } else {
    return <div>No posts to show.</div>;
  }
};

export { PostList as default };
