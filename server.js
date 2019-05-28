var express = require('express')
    , user = require('./routes/user')
    , routes = require('./routes/index')
    , multer = require('multer')
    , path = require('path');


var session = require('express-session');
global.app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
// ! global


var hostname = 'localhost';
var port = 9999;

// ! mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejsimages'
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
app.use('/login', express.static(path.join(__dirname, 'public')));
app.use('/home', express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


//TODO: set upload image to server :) - start setup upload image
// ! in future -> all upload to function :(
// ? dont code like this 
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, '3raw' + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
// ! end setup image



// ? development only
app.get('/', routes.index);// ? call for main index page
app.get('/register', user.signup);// ? call for signup page
app.post('/register', user.signup);// ? call for signup post 
app.get('/login', routes.index);// ? call for login page
app.post('/login', user.login);// ? call for login post
app.get('/login/register', user.signup);// ? call for signup page
app.get('/home/profile', user.profile);// ? to render users profile
app.get('/home/logout', user.logout);// ? call for logout
app.get('/home', user.home);// ? call for login
app.get('/home-page', user.homenotlogin);// ? call for without login
app.get('/upload', user.upload);// ? call for page upload
// ? call for upload image
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        // ! this line for debug
        console.log(req.file.filename);
        var userId = req.session.userId;
        //var username = req.session.username;
        if (req.method == "POST") {
            if (userId == null) {// ? true-done
                var post = req.body;
                var title = post.title;
                var description = post.description;
                var sql = "INSERT INTO `photos_any`(`title`,`status_photo_any`,`images_url`,`images_description`) VALUES ('" + title + "','1','" + req.file.filename + "','" + description + "')";
                console.log(sql);
                var query_insert = db.query(sql, function (err, result) {
                    var url = `uploads/${req.file.filename}`;
                    res.redirect(url);
                });

            } else {
                res.redirect('/home');
            }
        }
    });
});

// ! Middleware
app.listen(`${port}`, () => {
    console.log(`App running in http://${hostname}:${port}`);
});