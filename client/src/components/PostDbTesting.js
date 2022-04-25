import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';

function PostDbTesting() {
  const refetchItemsToggle = false;
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [refetchItemsToggle]);

  const [items, setItems] = useState([]);
  const [editPostId, setEditPostId] = useState("");
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const fetchItems = async () => {
    let data = await fetch("http://localhost:3000/posts");
    let items = await data.json();
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
    result = await result
      .json()
      .then((refetchItemsToggle = !refetchItemsToggle));
  };

  const handlePostEdit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const title = e.target.title.value;
    const body = e.target.body.value;
    let result = await fetch(`http://localhost:3000/postedit/${id}`, {
      method: "post",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    });
    result = await result
      .json()
      .then((refetchItemsToggle = !refetchItemsToggle));
    setEditPostId("");
    setIsEditFormVisible(false);
  };

  const deletePost = async (id) => {
    let result = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result
      .json()
      .then((refetchItemsToggle = !refetchItemsToggle));
  };

  return (
    <section>
      <div>
        <h1>Posts</h1>
        <form
          method="POST"
          onSubmit={handlePost}
          style={{ visibility: !isEditFormVisible ? "visible" : "hidden" }}
        >
          <input type="text" name="title" />
          <input type="text" name="body" />
          <input type="submit" value="Send" />
        </form>

        <form
          method="POST"
          onSubmit={(e) => handlePostEdit(e, editPostId)}
          style={{ visibility: isEditFormVisible ? "visible" : "hidden" }}
        >
          <input type="text" name="title" />
          <input type="text" name="body" />
          <input type="submit" value="Update" />
        </form>

        {items.map((item) => (
          <div key={item._id}>
            <div>
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
            <button
              onClick={() => {
                deletePost(item._id);
              }}
            >
              X
            </button>

            <button
              onClick={() => {
                setEditPostId(item._id);
                setIsEditFormVisible(true);
                console.log(editPostId, isEditFormVisible);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                setItems([]);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostDbTesting;
