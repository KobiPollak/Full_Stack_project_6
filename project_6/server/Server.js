var mysql = require('mysql2');
var express = require('express');
const app = express()


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
                res.send(results.length === 0 ? false : results[0].userName);
            });
          });
  })

  app.get(`/info`, (req, res) => {
    // if (err) throw err;
    res.send('hhhhhhhhhhhhh');
    // const sql = ``
  })



const port = 3062; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});