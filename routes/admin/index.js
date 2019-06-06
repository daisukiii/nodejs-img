
/*exports.listuser=function(req,res){

    var sql="SELECT * FROM `users`";          
    db.query(sql, function(err, result){  
       res.render('admin/listuser',{data:result});
    });   
    
}

exports.user=function(req,res){
    var params=req.params;
    var id=params.id;
    var sql="SELECT * FROM USER WHERE ?",{id:id}
    db.query(sql, function(err,result){
        res.render('admin/user',{data:result});

    });*/
/// listuser
var post_md = require("../models/post");
exports.listuser = function (req, res) {

    var data = post_md.getAllPosts();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listuser", { data: data });

    }).catch(function (err) {
        res.render("admin/listuser", { data: { error: "Get Post data is Error" } });
    });
}
//--------------update user

exports.user=function(req,res){
    var params=req.params;
    var id=params.id;
    var data=post_md.getPostById(id);

    if(data){
        data.then(function(posts){
            var post=posts[0];
            var data={
                post:post,
                error:false                
            };
            res.render("Admin/user",{data:data});
        }).catch(function(err){
            var data={
                error: "Could not get User by Id"
            };
            res.render("Admin/user",{data:data});
        });
    }else{
        var data={
            error: "Could not get User by Id"
        };
        res.render("Admin/user",{data:data});

    }
};
// status_code: http:500 loi, 200: thanhcong
exports.edituser=function(req,res){
    var params=req.body;
    data=post_md.updatePost(params);
    if(!data){        
        res.json({status_code:500});
    }else{
        data.then(function(result){            
            res.json({status_code:200});            
        }).catch(function(err){
            res.json({status_code:500});
        });
    }    
};

exports.listdeleteuser = function (req, res) {

    var data = post_md.getAllDeletePosts();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("admin/listdeleteuser", { data: data });

    }).catch(function (err) {
        res.render("admin/listdeleteuser", { data: { error: "Get Post data is Error" } });
    });
}



//deleteuser
/*exports.deleteuser=function(req,res){
    var post_id=req.body.id;
    var data=post_md.deletePost(post_id);
    if(!data){
        res.json({status_code:500});
    }else{
        data.then(function(result){
            res.json({status_code:200});
        }).catch(function(err){
            res.json({status_code:500});
        });
    }
};*/
//them user
exports.newuser=function(req,res){
    res.render("Admin/newuser",{data:{error:false}});
}
exports.newuser_1=function(req,res)
{
    var params=req.body;   

        var data=post_md.addPost(params);
        data.then(function(result){
        res.redirect("/admin/listuser");
        }).catch(function(err){
        var data={error:"Khong the insert"};
        res.render("Admin/newuser",{data:data});

    });
};

    

