import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    //postsDispatch(addPost(title, body));
    let result = await fetch("http://localhost:3000/users/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 400) console.log("Nope, try again");
      else navigate("/");
    });
  };

  return (
    <form onSubmit={loginUser} className="form">
      <input
        value={username}
        className="text-input"
        placeholder={"Username"}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type={"password"}
        className="text-input"
        value={password}
        placeholder={"Password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="button">Login</button>
    </form>
  );
};

export { Login as default };
