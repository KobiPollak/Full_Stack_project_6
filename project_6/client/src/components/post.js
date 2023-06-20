import React, { useState } from "react";

import "../styles/post.css";

export default function Post(props) {
  let [commentsList, setCommentsList] = useState([]);

  async function importComments(e) {
    const comments = await fetch(
      `http://localhost:3070/comments/${props.p.id}`
    );
    const comments_list = await comments.json();
    setCommentsList(comments_list);
    // e.target.style.visibility = "hidden";
    e.target.classList.add("hidden");
  }

  const deleteComment = (id) => {
    const deleteElement = {
      id: id,
    };

    // Show the confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmed) {
      async function deleteComment() {
        const response = await fetch("http://localhost:3070/comment/delete", {
          method: "POST",
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(deleteElement),
        });
        return response.json();
      }

      deleteComment();

      const updateCommentList = commentsList.filter(
        (comment) => comment.id !== id
      );
      setCommentsList(updateCommentList);
    }
  };

  return (
    <>
      <div
        className={`post-card ${props.isSelected ? "selected" : ""}`}
        onClick={() => props.handleClick(props.p.id)}
      >
        <div className="post-card-title">
          <label>Title: </label>
          <label>{props.p.title}</label>
        </div>
        <div className="post-card-body">
          <label>Body: </label>
          <label>{props.p.body}</label>
        </div>
        <div className="button-cont">
          <button
            id={`showB-${props.p.id}`}
            className={`see-comments-button ${
              props.isSelected ? "" : "hidden"
            }`}
            // style={{ visibility: props.isSelected ? "visible" : "hidden" }}
            onClick={(e) => importComments(e)}
          >
            Show Comments
          </button>
        </div>
        {commentsList.map((comment, index) => (
          <li>
            <div className="post-card-title">
              <label>Name: </label>
              <label>{comment.name}</label>
            </div>
            <div className="post-card-body">
              <label>Body: </label>
              <label>{comment.body}</label>
            </div>
            <div className="delete" onClick={() => deleteComment(comment.id)}>
              {/* <i class="fa-solid fa-trash"></i> */}
              <p>delete comment</p>
            </div>
            {index < commentsList.length - 1 && (
              <hr className="horizontal-line" />
            )}
          </li>
        ))}
        <div className="button-cont">
          <button
            className={`see-comments-button ${
              commentsList.length === 0 ? "hidden" : ""
            }`}
            onClick={() => {
              setCommentsList([]);
              document
                .getElementById(`showB-${props.p.id}`)
                .classList.remove("hidden");
            }}
          >
            Hide Comments
          </button>
        </div>
        <div
          className="delete-icon1"
          onClick={() => props.handleDelete(props.p.id)}
        >
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </>
  );
}
