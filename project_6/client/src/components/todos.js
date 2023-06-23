import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../styles/todos.css";

const Todos = () => {
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const [todo_list, setTodo_list] = useState([]);
  const [sorting, setSorting] = useState("id");
  const [newTodo, setNewTodo] = useState("");

  const handleSorting = (e) => {
    setSorting(e);
    async function importTodos() {
      console.log("qqqqqqqqqqqqqqqqq");
      const sortMethod =
        sorting === "id"
          ? "idSort=true"
          : sorting === "uncompleted"
          ? "completedSort=true"
          : "randomSort=true";

      console.log(sortMethod);
      const todo_list = await fetch(
        `http://localhost:3070/todos/${user_id}?${sortMethod}`
      );
      const data = await todo_list.json();

      setTodo_list(data);
    }
    importTodos();
  };

  useEffect(() => {
    handleSorting("id");
  }, []);

  const handleTodoClick = (id, completed) => {
    const toChange = {
      userId: user_id,
      postId: id,
      completed: completed,
    };
    async function postData(toChange) {
      const response = await fetch("http://localhost:3070/todos", {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(toChange),
      });
      return response.json();
    }

    const response = postData(toChange);
    console.log(response);
    console.log(todo_list);
    const localChange = todo_list.find((todo) => todo.id === id);
    const index = todo_list.indexOf(localChange);
    console.log(localChange);
    const new_list = todo_list.filter(function (el) {
      return el !== localChange;
    });
    console.log(new_list);
    localChange.completed = completed;
    new_list.splice(index, 0, localChange);

    setTodo_list(new_list);
  };

  const handleAddTodo = () => {
    const newTodoObject = {
      userId: user_id,
      title: newTodo,
      completed: "0",
    };

    async function postTodo() {
      console.log(newTodoObject);
      const response = await fetch("http://localhost:3070/todos/new", {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newTodoObject),
      })
        .then((res) => res.json())
        .then((res) => {
          newTodoObject["id"] = res.insertId;
          console.log(res.insertId);
          const updatedTodoList = [...todo_list, newTodoObject];
          setTodo_list(updatedTodoList);

          setNewTodo("");
          return res;
        });

      return response;
    }

    postTodo();
  };

  const handleDelete = (id) => {
    const deleteElement = {
      userId: user_id,
      todoId: id,
    };

    async function deleteTodo() {
      const response = await fetch("http://localhost:3070/todos/delete", {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(deleteElement),
      });
      return response.json();
    }

    deleteTodo();

    const updatedTodoList = todo_list.filter((todo) => todo.id !== id);
    setTodo_list(updatedTodoList);
  };

  return (
    <div className="todo-list">
      <div className="add-todo">
        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <div className="sort-select">
        <label>Sort by:</label>
        <select value={sorting} onChange={(e) => handleSorting(e.target.value)}>
          <option value="uncompleted">Uncompleted</option>
          <option value="id">Sort by ID</option>
          <option value="random">Sort randomly</option>
        </select>
      </div>
      {todo_list.map((todo) => (
        <div
          key={todo.id}
          className={`todo ${todo.completed === "1" ? "completed" : ""}`}
        >
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.completed === "1"}
              onChange={() =>
                handleTodoClick(todo.id, todo.completed === "1" ? "0" : "1")
              }
            />
          </div>
          <span className="title">{todo.title}</span>
          <div className="delete-icon" onClick={() => handleDelete(todo.id)}>
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
