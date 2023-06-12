var mysql = require('mysql2');
var express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kobi09pollak",
    database: "project6"
  });

  app.get('/', (req,res) => {
    res.send('Hello world');
  })

  app.get(`/login/:userName/:password`, (req, res) => {
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

  app.get(`/todos/:userId`, (req, res) => {
    const userId = req.params.userId;
    const completedSort = req.query.completedSort || false;
    const idSort = req.query.idSort || false;
    const randomSort = req.query.randomSort || false;
    con.connect(function(err){
        if (err) throw err;
        const sql = `select * from todos as t where t.userId = ${userId} order by ${idSort ? "id": completedSort ? "completed" : randomSort ? "RAND()" : "id"} ASC`;
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

  app.post('register', (req, res) => {
    const { userName, password, name,  phone, email, address, website, company} = req.body;
    const checkUsernameQuery = `SELECT * FROM users WHERE userName=${userName}`;
    con.query(checkUsernameQuery, function(err, results, fields){
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length > 0) {
        res.status(400).json({ error: 'Username already exists' });
      } else { 
        const insertUserQuery = 'INSERT INTO users (userName, password, name,  phone, email, address, website, company) VALUES ?';
        const values = [ userName, password, name,  phone, email, address, website, company];
        con.query(insertUserQuery, values, (err, result) => {
          if (err){
            console.log(err);
            result.status(500).json({ error: 'Internal server error' });
        } else {
          result.json({ message: 'User registered successfully' });
        }
        })
      }
    })


  })



const port = 3070; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});