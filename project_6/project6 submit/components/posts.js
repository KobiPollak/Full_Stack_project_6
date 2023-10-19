import React, { useEffect, useState } from "react";
import Post from "../components/post";

const Posts = () => {
  let [data, setData] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser.id;

  async function importData() {
    const posts_list = await fetch(`http://localhost:3070/posts/${userId}`);
    const post_list_json = await posts_list.json();
    setData(post_list_json);
  }

  useEffect(() => {
    importData();
  }, []);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handleDelete = (id) => {
    const deleteElement = {
      id: id,
      userId: userId,
    };

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?\n the deleting will delete all the comments that related."
    );

    if (confirmed) {
      async function deletePost() {
        const response = await fetch("http://localhost:3070/posts/delete", {
          method: "POST",
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(deleteElement),
        });
        return response.json();
      }

      deletePost();

      const updatePostsList = data.filter((post) => post.id !== id);
      setData(updatePostsList);
    }
  };

  const handleAddPost = () => {
    console.log(newPostTitle);
    console.log(newPostBody);
    const newPost = {
      userId: userId,
      title: newPostTitle,
      body: newPostBody,
    };

    async function postNewPost() {
      console.log(newPost);
      const response = await fetch("http://localhost:3070/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => res.json())
        .then((res) => {
          newPost["id"] = res.insertId;
          const updatedPostList = [...data, newPost];
          setData(updatedPostList);
          setNewPostBody("");
          setNewPostTitle("");
        });
    }

    postNewPost();
  };

  return (
    <>
      <h1 className="title">Posts</h1>
      <div className="add-post">
        <input
          type="text"
          className="post-input"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Enter a new post title"
        />
        <input
          type="text"
          className="post-input"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
          placeholder="Enter a new post body"
        />
        <button className="add-button" onClick={handleAddPost}>
          Add Post
        </button>
      </div>
      <ol>
        {console.log(data)}
        {data.map((post) => (
          <li>
            <Post
              key={post.id}
              p={post}
              isSelected={selectedPostId === post.id}
              handleClick={handlePostClick}
              handleDelete={handleDelete}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Posts;
