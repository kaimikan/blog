import React, { useState } from "react";

const PostStormsInput = ({ socket }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    console.log("should have emitted message");
    socket.emit("message", value);
    setValue("");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default PostStormsInput;
