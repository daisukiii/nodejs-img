//TODO: register
exports.signup = function (req, res) {
    message = '';
    message_e = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.username;
        var pass = post.pass;
        var email = post.email;
        // ! just for debug - 1 rows
        console.log(`${name}///${pass}///${email}`);
        var sql_check = "SELECT * FROM `users` WHERE `username` = '" + name + "'";
        var sql_check_e = "SELECT * FROM `users` WHERE `email` = '" + email + "'";
        var sql = "INSERT INTO `users`(`username`,`email`,`pass`) VALUES ('" + name + "','" + email + "','" + pass + "')";
        // ! just for debug - 2 rows
        console.log(sql);
        console.log(sql_check);

        // TODO: check username and email exist
        var result_email = db.query(sql_check_e, function (err, result) {
            return result;
        });
        var query = db.query(sql_check, function (err, result) {
            // ! just for debug
            console.log(result.length);
            console.log(result);
            // TODO: check user
            if (result.length > 0) {
                message = "This username is already taken";
                res.render('register/index.ejs', { message: message });
            }
            // TODO: check email
            else if (result_email.length > 0) {
                message_e = "This email is already taken";
                res.render('register/index.ejs', { message_e: message_e });
            }
            //TODO: if anything true, insert to datebase
            else {
                var query_insert = db.query(sql, function (err, result) {
                    message = "You are register successfully!";
                    res.render('login/index.ejs', { message: message });
                });
            }
        });
    } 
    else {
        res.render('register/index.ejs');
    }
};

//TODO: login
exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var pass = post.pass;

        var sql = "SELECT * FROM `users` WHERE `email`='" + email + "' and pass = '" + pass + "'";
        db.query(sql, function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                //TODO: just for debug
                console.log(results[0].id);
                res.redirect('/home/profile');
            }
            else {
                message = 'Email or username not correct.';
                res.render('login/index.ejs', { message: message });
            }

        });
    } else {
        res.render('login/index.ejs', { message: message });
    }
};

//TODO: after login
exports.dashboard = function (req, res, next) {

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('dashboard.ejs', { user: user });
    });
};
//TODO: logout functionality
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};

//TODO: show profile
exports.profile = function(req, res){

    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
    db.query(sql, function(err, result){  
       res.render('profile.ejs',{data:result});
    });
 };