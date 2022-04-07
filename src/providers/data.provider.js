import React, { useState } from "react";
import DataContext from "../context/data.context";

// do not think we need this but will keep it still
//export const PostConsumer = PostsContext.Consumer;

const DataProvider = (props, value) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const values = { title, setTitle, body, setBody };

  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <DataContext.Provider value={{ ...values }}>
      {props.children}
    </DataContext.Provider>
  );
};

export { DataProvider as default };
