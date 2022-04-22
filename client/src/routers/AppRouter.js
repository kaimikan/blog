import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogApp from "../components/BlogApp";
import AddPostForm from "../components/AddPostForm";
import EditPostForm from "../components/EditPostForm";
import SocketProvider from "../providers/socket.provider";
import PostsProvider from "../providers/posts.provider";
import DataProvider from "../providers/data.provider";
import PostPage from "../components/PostPage";
import Header from "../components/Header";
import PostStormPage from "../components/PostStormPage";

const AppRouter = () => {
  return (
    <PostsProvider>
      <DataProvider>
        <SocketProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<BlogApp />} exact={true} />
              <Route path="/add" element={<AddPostForm />} />
              <Route
                path="/edit/:id"
                element={<EditPostForm />}
                exact={false}
              />
              <Route path="/post/:id" element={<PostPage />} exact={false} />
              <Route path="/storm" element={<PostStormPage />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </DataProvider>
    </PostsProvider>
  );
};

export { AppRouter as default };
