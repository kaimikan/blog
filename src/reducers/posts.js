const postsReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_POSTS":
      return action.posts;
    case "ADD_POST":
      return [...state, { title: action.title, body: action.body }];
    case "REMOVE_POST":
      return state.filter((post) => post.title !== action.title);
    default:
      return state;
  }
};

export { postsReducer as default };
