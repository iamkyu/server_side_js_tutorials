// express 모듈
var express = require('express');

// POST 요청 처리를 위한 body-parser 미들웨어
var bodyParser = require('body-parser');

// multipart/form-data 처리를 위한 모듈
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })

// file system 관련 모듈
var fs = require('fs');

// mysql connect 모듈
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : '192.168.56.101', // Test DB on My Virtual Machine
  user     : 'testuser',
  password : 'java41',
  database : 'testdb'
});
conn.connect;

// app 기본 세팅
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');


// 라우트--------------------------------------------------------
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded : '+req.file.filename);
});

app.get('/topic/add', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, filed) {
    if(err) {
      console.log(err);
          res.status(500).send('Internal Server Error');
    }
    res.render('add', {topics:topics});
  });
});
app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic(title, description, author) VALUES(?, ?,?)';
  conn.query(sql, [title, description, author], function(err, result  , fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/'+result.insertId);
    }
  });
})


app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields) {
    var id = req.params.id;
    if(id) {
      var sql = 'SELECT * FROM topic WHERE id = ?';
      conn.query(sql, [id], function(err, topic, fields) {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('view', {topics:topics, topic:topic[0]});  
        }
      });
    } else {
      res.render('view', {topics:topics});  
    }
  });
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})