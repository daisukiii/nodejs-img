var http = require('http');
var express = require('express');
var app = express();
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
const bodyParser = require('body-parser');

const fs = require('fs');
const hostname = 'localhost';
const port = 9999;

app.use(express.static(__dirname + "/public"));
app.use('/views',express.static('views'));

app.get('/', (req, res) => {
    fs.readFile('./views/login/index.ejs', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Lost file!');
        } else {
            res.write(data);
        }
        res.end();
    })
});

app.get('/register', (req, res) => {
    fs.readFile('./views/register/index.ejs', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Lost file!');
        } else {
            res.write(data);
        }
        res.end();
    })
});

app.get('/home', (req, res) => {
    fs.readFile('./views/home/index.ejs', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Lost file!');
        } else {
            res.write(data);
        }
        res.end();
    })
});

app.get('/upload', (req, res) => {
    fs.readFile('./views/home/upload.ejs', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Lost file!');
        } else {
            res.write(data);
        }
        res.end();
    })
});

app.listen(9999, () => {
    console.log(`App running in http://${hostname}:${port}`);
});