import React , {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';

import '../styles/todos.css'

const Todos = () => {
    const [todo_list, setTodo_list] = useState([]);
    const [sorting, setSorting] = useState("id"); // default sorting option

    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('user')).id

        async function importTodos() {
            const todo_list = await fetch(`http://localhost:3070/todos/${user_id}`)
            const data = await todo_list.json()
            // const user_todos = data.filter(todo => todo.userId === user_id)
            setTodo_list(data)
            // console.log(user_todos[7])
        }

        importTodos()
    }, [])

    const sortTodos = () => {
        if (sorting === "uncompleted") {
            // setTodo_list(todo_list.filter((todo) => !todo.completed))
          return todo_list.filter((todo) => !todo.completed);
        } else if (sorting === "id") {
            // setTodo_list(todo_list.sort((a, b) => a.id - b.id))
          return todo_list.sort((a, b) => a.id - b.id);
        } else if (sorting === "random") {
            // setTodo_list(todo_list.sort(() => Math.random() - 0.5))
          return todo_list.sort(() => Math.random() - 0.5);
        } else {
          return todo_list;
        }
      };

    const handleTodoClick = (id) => {
        // async function postData() {
        //     const response = await fetch('https://jsonplaceholder.typicode.com/', {
        //       method: "POST", // *GET, POST, PUT, DELETE, etc.
        //       mode: "cors", // no-cors, *cors, same-origin
        //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //       credentials: "same-origin", // include, *same-origin, omit
        //       headers: {
        //         "Content-Type": `/todos`,
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //       redirect: "follow", // manual, *follow, error
        //       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //       body: JSON.stringify(newValue), // body data type must match "Content-Type" header
        //     });
        //     return response.json(); // parses JSON response into native JavaScript objects
        //   }
        // const response = postData()
        // console.log(response)
        console.log(todo_list)
        const user = todo_list.find(user => user.id === id)
        const index = todo_list.indexOf(user)
        console.log(user)
        const new_list = todo_list.filter(function(el) { return el !== user; });
        console.log(new_list)
        user.completed = !user.completed
        new_list.splice(index, 0, user)
        // new_list.push(user)
        setTodo_list(new_list)
    }



    return(
        <div className="todo-list">
            <div className="sort-select">
            <label>Sort by:</label>
            <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
                <option value="uncompleted">Uncompleted</option>
                <option value="id">Sort by ID</option>
                <option value="random">Sort randomly</option>
            </select>
            </div>
            {sortTodos().map((todo) => (
            <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
                <div className="checkbox-wrapper">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoClick(todo.id, !todo.completed)}
                />
                </div>
                <span className="title">{todo.title}</span>
            </div>
            ))}
        </div>
        
    )

}

export default Todos;