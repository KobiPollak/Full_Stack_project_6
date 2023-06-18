var mysql = require('mysql2');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kobi09pollak",
    database: "project6"
  });

  app.get('/', (req,res) => {
    res.send('Hello world');
  })

  app.get('/login/:userName/:password', (req, res) => {
    const userName = req.params.userName;
    const password = req.params.password;
    con.connect(function(err) {
            if (err) throw err;
            console.log(userName, password);
            console.log("Connected!");
            const sql = `select * from passwords as p join users as u ON p.userId = u.id where u.userName = '${userName}' and p.password = ${password} `;
            // const sql = `select * from passwords as p join users as u`;
            con.query(sql, function (err, results, fields) {
                if (err) throw err;
                console.log("query done");
                const p = JSON.stringify({f:43, ld: 423});
                console.log(JSON.parse(p));
                console.log(results[0].id);
                res.statusCode = 200;
                res.send(results.length === 0 ? JSON.stringify(false) : JSON.stringify(results[0]));
            });
          });
  })

  app.get(`/todos/:user_id`, (req, res) => {
    const userId = req.params.user_id;
    console.log(userId);
    // const userId = 1;
    const completedSort = req.query.completedSort || false;
    const idSort = req.query.idSort || false;
    const randomSort = req.query.randomSort || false;
    con.connect(function(err){
        if (err) throw err;
        const sql = `select * from todos as t where t.userId = '${userId}' order by '${idSort ? "id": completedSort ? "completed" : randomSort ? "RAND()" : "id"}' ASC`;
        console.log(sql);
        con.query(sql, function (err, results, fields){
            if (err) throw err;
            console.log(results);
            res.send(JSON.stringify(results));
        })
    })
  })

  app.get(`/posts/:userId`, (req, res) => {
    const userId = req.params.userId;
    const withComments = req.query.withComments ;
    console.log(withComments);
    let sql;
    if (withComments === true){
        sql = `select * from posts as p join comments as c on p.userId = ${userId} and p.id = c.postId`;
    } else {
        sql = `select * from posts where userId = ${userId}`;
    }
    con.query(sql, function (err, results, fields){
        if (err) throw err;
        console.log(results);
        res.send(JSON.stringify(results));
    })
  })

  app.get('/info/:username', (req, res) => {
    const username = req.params.username;
    console.log(username);
    const sql = `SELECT * FROM users WHERE userName = '${username}'`;
    con.query(sql,  function (err, results, fields){
      if (err) throw err;
      console.log(results);
      res.send(JSON.stringify(results[0]));
    })
  })

  app.post('/register', (req, res) => {
    const { username, password, name,  phone, email, address, website, company} = req.body;
    const checkUsernameQuery = `SELECT * FROM users WHERE userName = '${username}'`;
    con.query(checkUsernameQuery, function(err, results, fields){
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error111111' });
      } else if (results.length > 0) {
        res.status(400).json({ error: 'Username already exists' });
      } else { 
        const insertUserQuery = 'INSERT INTO users SET ?';
        const values = { userName: username, name, phone, email, address, website, company };
        console.log(values)
        con.query(insertUserQuery, values, (err, result) => {
          if (err){
            console.log(err);
            res.status(500).json({ error: 'Internal server error22222222' });
        } else {
          console.log(result)
          const insertPasswordQuery = `INSERT INTO passwords (userId, password) VALUES ('${result.insertId}', '${password}')`;
          con.query(insertPasswordQuery, (err, result) => {
            if (err){
              console.log(err);
              res.status(500).json({ error: 'Internal server error33333' });
          } else {
            console.log(result);
            res.status(200).json(values)
          }
          })
        }
        })
      }
    })


  })



const port = 3070; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});