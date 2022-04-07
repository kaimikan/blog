const postsReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_POSTS":
      return action.posts;
    case "ADD_POST":
      return [
        ...state,
        { id: action.id, title: action.title, body: action.body },
      ];
    case "EDIT_POST":
      return state.map((post) => {
        if (post.id === action.id) {
          return { ...post, ...action.updates };
        } else {
          return post;
        }
      });
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.id);
    default:
      return state;
  }
};

export { postsReducer as default };
