import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogApp from "../components/BlogApp";
import AddPostForm from "../components/AddPostForm";
import PostsProvider from "../providers/posts.provider";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <PostsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BlogApp />} exact={true} />
          <Route path="/add" element={<AddPostForm />} />
        </Routes>
      </BrowserRouter>
    </PostsProvider>
  );
};

export { AppRouter as default };
