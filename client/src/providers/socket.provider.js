import React, { useState, useEffect } from "react";
import SocketContext from "../context/socket.context";
import io from "socket.io-client";

const SocketProvider = (props, value) => {
  const [socket, setSocket] = useState(null);
  const values = { socket, setSocket };

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    // value prop is where we define what values
    // that are accessible to consumer components
    <SocketContext.Provider value={{ ...values }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketProvider as default };
