var http = require('http')
    , express = require('express')
    , user = require('./routes/user')
    , routes = require('./routes/index')
    , path = require('path');

var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");


var hostname = 'localhost';
var port = 9999;

// ! mysql
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

global.db = connection;

// ! all environments
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// ? development only
app.get('/', routes.index);//call for main index page
app.get('/register', user.signup);//call for signup page
app.post('/register', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/profile', user.profile);//to render users profile
app.get('/home/logout', user.logout);//call for logout

// ! Middleware
app.listen(`${port}`, () => {
    console.log(`App running in http://${hostname}:${port}`);
});