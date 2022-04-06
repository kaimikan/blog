import { useState, useEffect } from "react";

const useLocalStorage = ({ postsState, postsDispatch }) => {
  // BUG local storage stopped working after this transition and I am not sure why
  // i will leave it like this for now since it should be replaced with firebase soon enough
  useEffect(() => {
    console.log("Application loaded, local storage items added");
    const postsLocalData = JSON.parse(
      localStorage.getItem("postsLocalStorage")
    );

    console.log("Fetched: ", postsLocalData);
    if (postsLocalData) {
      postsDispatch({
        type: "POPULATE_POSTS",
        posts: postsLocalData,
      });
    }
  }, []);

  useEffect(() => {
    console.log("Posts Updated, updating local storage in return");
    localStorage.setItem("postsLocalStorage", JSON.stringify(postsState));
  }, [postsState]);
};

export { useLocalStorage as default };
