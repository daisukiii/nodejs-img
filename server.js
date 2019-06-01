var express = require("express"),
  user = require("./routes/user"),
  routes = require("./routes/index"),
  multer = require("multer"),
  path = require("path");

var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
// ! global

var hostname = "localhost";
var port = 9999;

// ! mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejsimages"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

global.db = connection;

// ! all environments
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/login", express.static(path.join(__dirname, "public")));
app.use("/home", express.static(path.join(__dirname, "public")));
app.use("/u", express.static(path.join(__dirname, "public")));
app.use("/i", express.static(path.join(__dirname, "public")));
app.use("/p", express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 18000000
    } // ! auto delete after 5 hour
  })
);

//TODO: set upload image to server :) - start setup upload image
// ! in future -> all upload to function :(
// ? dont code like this
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "3raw" + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

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
    cb("Error: Images Only!");
  }
}
// ! end setup image

// ? development only
app.get("/", routes.index); // ? call for main index page
app.get("/register", user.signup); // ? call for signup page
app.post("/register", user.signup); // ? call for signup post
app.get("/login", routes.index); // ? call for login page
app.post("/login", user.login); // ? call for login post
app.get("/login/register", user.signup); // ? call for signup page
app.get("/home/profile", user.profile); // ? to render users profile
app.get("/home/logout", user.logout); // ? call for logout
app.get("/home", user.home); // ? call for login
app.get("/home-page", user.homenotlogin); // ? call for without login
app.get("/upload", user.upload); // ? call for page upload

// ? call for upload image
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    // ! this line for debug
    console.log(req.file.filename);
    var userId = req.session.userId;
    // ? var username = req.session.username;
    var post = req.body;
    var title = post.title;
    var description = post.description;
    if (req.method == "POST") {
      if (userId == null) {
        // ? true-done
        var sql_photos_any =
          "INSERT INTO `photos_any` (`title`,`status_photo_any`,`images_url`,`images_description`) VALUES ('" +
          title +
          "','1','" +
          req.file.filename +
          "','" +
          description +
          "')";
        console.log(sql_photos_any); // TODO: just for debug
        db.query(sql_photos_any, function (err, result) {
          db.query(
            "SELECT * FROM `photos_any` WHERE `images_url` = '" +
            req.file.filename +
            "'",
            function (err, result) {
              var url = `i/${result[0].id}`;
              res.redirect(url);
            }
          );
        });
      } else {
        var sql_photos =
          "INSERT INTO `photos` (`title`,`id_user`,`status_photo`,`images_description`,`images_url`) VALUES ('" +
          title +
          "','" +
          userId +
          "','0','" +
          description +
          "','" +
          req.file.filename +
          "')";
        console.log(sql_photos); // TODO: just for debug
        db.query(sql_photos, function (err, result) {
          sql_photos_redirect =
            "SELECT * FROM `photos` WHERE `images_url` = '" +
            req.file.filename +
            "'";
          db.query(sql_photos_redirect, function (err, result) {
            var url = `u/${result[0].id}`;
            res.redirect(url);
          });
        });
      }
    }
  });
});

// ?  after upload image with login
app.get("/u/:id", async (req, res) => {
  var title = "",
    img_description = "",
    username = "",
    img_url = "";
  var username_nav = req.session.username;
  if (username_nav == null) {
    username_nav = "";
  }
  // var sql2 = "SELECT * FROM `users` WHERE `id` = (SELECT `id_user` FROM `photos` WHERE `id` = '" + id + "')";
  // console.log(sql2);// ! only for debug
  // var ex_query = db.query(sql2, function (err, result) {
  //     return result[0].username;
  // });
  var id = req.params.id;
  var sql = "SELECT * FROM photos WHERE id = " + id + "";
  console.log(sql); // ! only for debug
  db.query(sql, async function (err, result) {
    if (err) throw err;
    // ! just for debug
    console.log(result);
    console.log(result[0].images_url);
    title = result[0].title;
    img_description = result[0].images_description;
    //img_url = '<img class="card-img-top img-fluid" src="';
    img_url += "uploads/";
    img_url += result[0].images_url;
    //img_url += '"  alt="Card image cap"></img>';
    db.query(
      "SELECT * FROM users WHERE id=" + result[0].id_user + "",
      async function (err, result) {
        if (err) throw err;
        console.log(result);
        username = result[0].username;
        id_username = result[0].id;
        db.query(
          "SELECT * FROM photos ORDER BY id DESC LIMIT 10",
          async function (err, result) {
            if (err) throw err;
            await res.render("home/newsfeed.ejs", {
              username: username,
              id_username: id_username,
              title: title,
              img_description: img_description,
              img_url: img_url,
              username_nav: username_nav,
              data: result
            });
          }
        );
      }
    );
  });
});

// ? after upload image whitout login
app.get("/i/:id", async (req, res) => {
  var title = "",
    img_description = "",
    username = "Anonymous",
    img_url = "",
    id_username = "../home-page";
  var username_nav = req.session.username;
  if (username_nav == null) {
    username_nav = "";
  }
  var id = req.params.id;
  db.query("SELECT * FROM photos_any WHERE id= " + id + "", async function (
    err,
    result
  ) {
    if (err) throw err;
    title = result[0].title;
    img_description = result[0].images_description;
    img_url += "uploads/";
    img_url += result[0].images_url;
    db.query("SELECT * FROM photos ORDER BY id DESC LIMIT 10", async function (
      err,
      result
    ) {
      if (err) throw err;
      await res.render("home/newsfeed.ejs", {
        username: username,
        id_username: id_username,
        title: title,
        img_description: img_description,
        img_url: img_url,
        username_nav: username_nav,
        data: result
      });
    });
  });
});

// ? profile user, show all image for user
app.get("/p/:id", (req, res) => {
  var id = req.params.id;
  var username_nav = req.session.username;
  var id_user = req.session.userId;
  if (username_nav == null) {
    username_nav = "";
  }
  if (id == id_user) {
    // res.render("home/profile.ejs", {
    //   username_nav: username_nav,
    //   id: id
    // });
  } else {
    res.render("home/profile.ejs", {
      username_nav: username_nav,
      id: id
    });
  }

  //res.html(id);
});
// ? just for test get data from url
app.get("/test/:id", (req, res) => {
  /*
    On express 3
    !    req.param(fieldName)
    On express 4
    !    req.params.fieldName
    */
  var id = req.params.id;
  console.log(id);
  res.render("test.ejs", {
    data: id
  });
});
// ! Middleware
app.listen(`${port}`, () => {
  console.log(`App running in http://${hostname}:${port}`);
});