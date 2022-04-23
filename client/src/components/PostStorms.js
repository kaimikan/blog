import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostsContext from "../context/posts.context";
import { addPost } from "../actions/posts";

function PostStorms({ socket }) {
  const [messages, setMessages] = useState({});
  const { postsDispatch } = useContext(PostsContext);
  const navigate = useNavigate();

  const addPostEvent = (e) => {
    e.preventDefault();
    let postTitle = "";
    let postBody = "";
    for (const [msgID, msgObj] of Object.entries(messages)) {
      postBody += msgObj.value + " ";
    }
    postTitle = postBody.split(" ")[0];
    console.log(postTitle, postBody);
    postsDispatch(addPost(postTitle, postBody));
    socket.emit("deleteMessages");
    navigate("/");
  };

  useEffect(() => {
    const messageListener = (message) => {
      console.log("WHAT");
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };
    const deleteMessagesListener = () => {
      setMessages((prevMessages) => {
        for (let i = 0; i < prevMessages.length; i++) {
          delete prevMessages[i];
        }
        return prevMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.on("deleteMessages", deleteMessagesListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
      socket.off("deleteMessages", deleteMessagesListener);
    };
  }, [socket]);

  return (
    <>
      <div className="message-list">
        {[...Object.values(messages)]
          .sort((a, b) => a.time - b.time)
          .map((message) => (
            <div
              key={message.id}
              className="message-container"
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              <span className="user">{message.user.name}:</span>
              <span className="message">{message.value}</span>
              <span className="date">
                {new Date(message.time).toLocaleTimeString()}
              </span>
            </div>
          ))}
      </div>

      <form onSubmit={addPostEvent} className="form">
        <button className="button">Save</button>
      </form>
    </>
  );
}

export default PostStorms;
