import React from "react";
import Post from "./Post";

const PostList = () => {
  const samplePosts = [
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
  ];

  return samplePosts.map((post) => <Post key={post.title} post={post} />);
};

export { PostList as default };
