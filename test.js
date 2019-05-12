var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'images'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});



var sql ="INSERT INTO `users`(`username`,`email`,`pass`) VALUES ('16520479','onepiece.hung@outlook.com','a')";
var sql2 = 'SELECT * FROM `users` WHERE `username` = "16520479" and `email` = "onepiece.hung@outlook.com"';


connection.query(sql2, function (err, result) {
    
    if (err) throw err;
    console.log(result[0]);
    console.log(result);
    console.log("1 record inserted");
    if (result.length>0) {
        console.log("OKOOKOKOKOKOKOK");
    }
});
connection.end();