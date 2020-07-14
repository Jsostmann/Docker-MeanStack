const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const http = require('http');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();
const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync('cert/server.key').toString();
const certificate = fs.readFileSync('cert/server.crt').toString();
const credentials = {key: privateKey, cert: certificate};


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


const conn = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'demodb'
});

conn.connect(function(err) {
  if (err){
    console.log('Cannot connect with database');
    console.log(err);
  }else{

    console.log("Connected to database");

    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname + '/public/html/index.html'));

    });

    app.post('/login', function(req, res) {
      var name = req.body.userName;
      conn.query(`SELECT * FROM USER WHERE firstName = ?`, [name], function(err, result){
      });
    });


    app.get('/hash', function(req, res){
      bcrypt.hash(req.query.hash, 10, function(err, hash) {
        res.send(hash);
      });
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
