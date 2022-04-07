import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogApp from "../components/BlogApp";
import AddPostForm from "../components/AddPostForm";
import EditPostForm from "../components/EditPostForm";
import PostsProvider from "../providers/posts.provider";
import DataProvider from "../providers/data.provider";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <PostsProvider>
      <DataProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<BlogApp />} exact={true} />
            <Route path="/add" element={<AddPostForm />} />
            <Route path="/edit/:id" element={<EditPostForm />} exact={false} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </PostsProvider>
  );
};

export { AppRouter as default };
