import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    //postsDispatch(addPost(title, body));
    let result = await fetch("http://localhost:3000/users/register", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={registerUser} className="form">
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
      <button className="button">Register</button>
    </form>
  );
};

export { Register as default };
