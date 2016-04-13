var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : '192.168.56.101', // Test DB on My Virtual Machine
  user     : 'testuser',
  password : 'java41',
  database : 'testdb'
});

conn.connect

// var sql = "SELECT * FROM topic";
// conn.query(sql, function(err, rows, fields) {
//   if (err) {
//   	console.log(err);
//   } else {
//   	for(var i=0; i<rows.length; i++) {
//   		console.log(rows[i].title);
//   	}
//   }
// });

// var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
// var params = ['Supervisor', 'Watcher', 'graphittie'];
// conn.query(sql, params,function(err, rows, fields) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(rows.insertId);
// 	}
// });

// var sql = 'UPDATE topic set title=?, description=? WHERE id=?';
// var params = ['JAVA', 'javajava', 1];
// conn.query(sql, params,function(err, rows, fields) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(rows);
// 	}
// });

var sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
conn.query(sql, params,function(err, rows, fields) {
	if(err) {
		console.log(err);
	} else {
		console.log(rows);
	}
});


conn.end();