import React from "react";

const AddPostForm = () => {
  return (
    <>
      <p>Write Post:</p>
      <form onSubmit={() => {}}>
        <input value={"Title"} placeholder={"Title"} onChange={(e) => {}} />
        <input value={"Body"} placeholder={"Body"} onChange={(e) => {}} />
        <button>Publish</button>
      </form>
    </>
  );
};

export { AddPostForm as default };
