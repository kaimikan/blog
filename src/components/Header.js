import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Blog</h1>
      <h3>Type your mind out</h3>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Post</Link>
        {/* <Link to="/about">About</Link> */}
      </div>
    </>
  );
};

export { Header as default };
