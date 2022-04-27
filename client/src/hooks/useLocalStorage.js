import { useEffect } from "react";

const useLocalStorage = ({ postsState, postsDispatch }) => {
  async function fetchData() {
    const postData = await fetch("http://localhost:3000/posts");
    const posts = await postData.json();
    console.log("Fetched: ", posts);
    if (posts) {
      postsDispatch({
        type: "POPULATE_POSTS",
        posts: posts,
      });
    }
  }

  useEffect(() => {
    console.log("Application loaded, MongoDB posts added");
    fetchData();
  }, []);

  //TODO find a way to not call this all the time, maybe call it every 10 secs or soemthing
  /* useEffect(() => {
    console.log("Posts Updated, updating MongoDB posts in return");
    fetchData();
  }, [postsState]); */
};

export { useLocalStorage as default };
