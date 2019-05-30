var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsimages'
});



connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM photos WHERE id = 2", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(result[0].images_url);
    });
});