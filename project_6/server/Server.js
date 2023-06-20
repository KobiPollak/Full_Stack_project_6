var mysql = require("mysql2");
var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kobi09pollak",
  database: "project6",
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ error: "userName and password are required" });
    return;
  }
  con.connect(function (err) {
    if (err) throw err;
    console.log(userName, password);
    console.log("Connected!");

    const sql = `SELECT * FROM passwords AS p JOIN users AS u ON p.userId = u.id WHERE u.userName = '${userName}' AND p.password = '${password}'`;

    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log("query done");
      res.statusCode = 200;
      res.send(
        results.length === 0
          ? JSON.stringify(false)
          : JSON.stringify(results[0])
      );
    });
  });
});

app.get(`/todos/:userId`, (req, res) => {
  const userId = req.params.userId;
  const completedSort = req.query.completedSort || false;
  const idSort = req.query.idSort || false;
  const randomSort = req.query.randomSort || false;
  con.connect(function (err) {
    if (err) throw err;
    const sql = `select * from todos as t where t.userId = ${userId} order by ${
      idSort ? "id" : completedSort ? "completed" : randomSort ? "RAND()" : "id"
    } ASC`;
    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log(results);
      res.send(JSON.stringify(results));
    });
  });
});

app.post("/todos/new", (req, res) => {
  const newTodo = req.body;
  console.log(newTodo);
  if (!newTodo.userId || !newTodo.title || !newTodo.completed) {
    res.status(400).send("ha ha ha");
    return;
  }
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  // Insert the new todo into the database
  const sql = `INSERT INTO todos SET ?`;
  console.log(sql);
  con.query(sql, newTodo, (error, results, fields) => {
    if (error) {
      console.error("Error inserting new todo:", error);
      res.status(500).json({ error: "Failed to create new todo." });
    } else {
      res
        .status(200)
        .json({
          message: "New todo created successfully.",
          insertId: results.insertId,
        });
    }
  });

});

app.get(`/posts/:userId`, (req, res) => {
  const userId = req.params.userId;
  const withComments = req.query.withComments;
  console.log(withComments);
  let sql;
  if (withComments === true) {
    sql = `select * from posts as p join comments as c on p.userId = ${userId} and p.id = c.postId`;
  } else {
    sql = `select * from posts where userId = ${userId}`;
  }
  con.query(sql, function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.send(JSON.stringify(results));
  });
});

app.post("/todos/delete", (req, res) => {
  const deleteElement = req.body;
  console.log(deleteElement)
  // Delete the todo from the database
  const deleteQuery = `DELETE FROM todos WHERE userId = ${deleteElement.userId} AND todoId = ${deleteElement.todoId}`;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  con.query(
    deleteQuery,
    [deleteElement.userId, deleteElement.todoId],
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo." });
      } else {
        res.status(200).json({ message: "Todo deleted successfully." });
      }
    }
  );
});

app.post("register", (req, res) => {
  const { userName, password, name, phone, email, address, website, company } =
    req.body;
  const checkUsernameQuery = `SELECT * FROM users WHERE userName=${userName}`;
  con.query(checkUsernameQuery, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      const insertUserQuery =
        "INSERT INTO users (userName, password, name,  phone, email, address, website, company) VALUES ?";
      const values = [
        userName,
        password,
        name,
        phone,
        email,
        address,
        website,
        company,
      ];
      con.query(insertUserQuery, values, (err, result) => {
        if (err) {
          console.log(err);
          result.status(500).json({ error: "Internal server error" });
        } else {
          result.json({ message: "User registered successfully" });
        }
      });
    }
  });
});

const port = 3070; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
