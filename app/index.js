var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();


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
  }else{
    console.log("YES");
    app.get('/', function(req, res){
      res.send("blah");
    });

    app.get('/db', function(req, res){
    conn.query("SELECT * FROM USER", function(err, result){
      res.send(result);
    });
  });
    app.listen(3000, function(){
      console.log('Server started on port 3000 | 8080 if running on docker...');
    });

  }
});
