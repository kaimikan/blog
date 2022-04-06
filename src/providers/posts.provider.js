import React, { useReducer, useEffect } from "react";
import PostsContext from "../context/posts.context";
import postsReducer from "../reducers/posts";
import useLocalStorage from "../hooks/useLocalStorage";

// do not think we need this but will keep it still
//export const PostConsumer = PostsContext.Consumer;

const PostsProvider = (props) => {
  const [postsState, postsDispatch] = useReducer(postsReducer, []);

  // does not make a lot of sense as a custom hook since
  // it is not reused but w/e, good practice
  useLocalStorage({ postsState, postsDispatch });

  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <PostsContext.Provider value={{ postsState, postsDispatch }}>
      {props.children}
    </PostsContext.Provider>
  );
};

export { PostsProvider as default };
