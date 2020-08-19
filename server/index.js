const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const http = require('http');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const https = require('https');
const fs = require('fs');
const mysqlhelper = require('./server_modules/mysql/mysql');

const privateKey = fs.readFileSync('cert/server.key').toString();
const certificate = fs.readFileSync('cert/server.crt').toString();
const credentials = {key: privateKey, cert: certificate};


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'public/html'));



const conn = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'demodb'
});
{
/*
conn.connect(function(err) {
  if (err){
    console.log('Cannot connect with database');
    console.log(err);
  }else{

    console.log("Connected to database");
    mysqlhelper.sayHello();

    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname + '/public/html/index.html'));

    });

    app.get('/signup', function(req, res){
      res.sendFile(path.join(__dirname + '/public/html/signup.html'));

    });

    app.post('/login', function(req, res) {
      var userName = req.body.userName;
      conn.query(`SELECT * FROM USER WHERE userName = ?`, [userName], function(err, result){
        if(result.length != 0) {
          var enteredPass = req.body.password;
          if(mysqlhelper.comparePasswords(enteredPass,result[0].userPass)) {
            res.json("welcome " + result[0].firstName);
          } else {
            res.json("invalid password");
          }
        } else {
          res.json("invalid user");
        }
      });
    });


    app.post('/signup', function(req, res) {
      var userName = req.body.userName;

      conn.query(`SELECT * FROM USER WHERE userName = ?`, [userName], function(err, result){
        console.log(result);
        if(result.length == 0) {

          var hashedPassword = mysqlhelper.hashPassword(req.body.password);
        //var newUser = `INSERT INTO USER (userName, userPass, firstName, lastName, age) VALUES (${userName}, ${hashedPassword}, ${req.body.firstName}, ${req.body.lastName}, ${req.body.age})`;
        var newUser = `INSERT INTO USER (userName, userPass, firstName, lastName, age) VALUES (laostmann, adas, lars, ostmann, 19)`;

        conn.query(newUser, function(err, result){
          console.log(result);
          res.json("new user created");
        });    
        }
      });  
    });


    app.get('/hash', function(req, res){
      bcrypt.hash(req.query.hash, 10, function(err, hash) {
        res.send(hash);
      });
    });


    app.get('/api/swagger.yaml', function(req, res){
      res.sendFile(path.join(__dirname + '/public/swagger.yaml'));
    });


    app.get('/db', function(req, res){
      conn.query("SELECT * FROM USER", function(err, result){
        res.send(result);
    });
  });

  
  const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(3000, function() {
      console.log('Server started on port 3000 | 8080 if running on docker...');
    });

  }

});
*/
}
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/jwt', function(req, res){
  var token = jwt.sign({
    data: req.query.data
  },process.env.JWT_SECRET, { expiresIn: '30min' },{ algorithm: 'HS256'});
  var decoded1 = jwt.verify(token,process.env.JWT_SECRET);

  res.json({"token": token,
            "decoded1": decoded1});
});

app.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname + '/public/html/signup.html'));

});

app.get('/db', function(req, res){
  conn.getConnection(function(err,connection){
    connection.query("SELECT * FROM USER", function(err, result){
      res.send(result);
  });
  });
});


app.post('/login', function(req, res) {
  conn.getConnection(function(err, connection) {
    var userName = req.body.userName;
    connection.query(`SELECT * FROM USER WHERE userName = ?`, [userName], function(err, result){
      if(result.length != 0) {
        var enteredPass = req.body.password;
        if(mysqlhelper.comparePasswords(enteredPass,result[0].userPass)) {
          //res.json("welcome " + result[0].firstName);
          res.render('home', {name: result[0].firstName}); 
        } else {
          res.json("invalid password");
        }
      } else {
        res.json("invalid user");
      }
    });
  });
});

app.post("/signup",function(req,res) {
  conn.getConnection(function(err, connection){
    
      var username = req.body.userName;
      console.log(req.body);
      connection.query(`SELECT * FROM USER WHERE userName = ?`,[username], function(err, rows) {

          if(rows.length == 0) {

            var hashedPassword = mysqlhelper.hashPassword(req.body.password);
            var post  = {userName: username, userPass: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age};

            connection.query('INSERT INTO USER SET ?', post, function(err, rows, feilds){
              connection.release();
              res.send("User created");
          });

          } else {
            connection.release();
            res.send("user Already Exists");
          }
           
      });
  });
});


    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(8080, function() {
      console.log('Server started on port 3000 | 8080 if running on docker...');
    });