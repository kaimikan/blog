import { useEffect } from "react";

const useLocalStorage = ({ postsState, postsDispatch }) => {
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
