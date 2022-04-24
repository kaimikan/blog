import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';

function PostDbTesting() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:3000/posts");
    const items = await data.json();
    setItems(items);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    let result = await fetch("http://localhost:3000/post", {
      method: "post",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
  };

  return (
    <section>
      <div>
        <h1>Posts</h1>
        <form method="POST" onSubmit={handlePost}>
          <input type="text" name="title" />
          <input type="text" name="body" />
          <input type="submit" value="Send" />
        </form>

        {items.map((item) => (
          <>
            <div key={item._id}>
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default PostDbTesting;
