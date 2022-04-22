import React, { useContext } from "react";
import SocketContext from "../context/socket.context";
import PostStorms from "./PostStorms";
import PostStormsInput from "./PostStormsInput";

const PostStormPage = () => {
  const { socket } = useContext(SocketContext);

  return (
    <>
      <div>
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__content">
              <h2 className="page-header__title">Blogstorm a post</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        {socket ? (
          <div className="chat-container">
            <PostStorms socket={socket} />
            <PostStormsInput socket={socket} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </>
  );
};

export { PostStormPage as default };
