var q=require("q");
//ds user
function getAllPosts(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM users', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}
//update user
function getPostById(id){
    var defer=q.defer();
    var query=db.query('SELECT * FROM users WHERE ?', {id:id},function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);            
        }
    });
    return defer.promise;

}

function updatePost(params){
    if(params){
        var defer=q.defer();
        var query=db.query('UPDATE users SET username=?,email=?,pass=?,status_user=?,point_user=? WHERE id=?',[params.username,params.email,params.pass,params.status_user,params.point_user,params.id],function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;   

}
//delete user
/*function deletePost(id){
    if(id){
        var defer=q.defer();
        var query=db.query('DELETE FROM users WHERE id=?',[id],function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;

}*/

function getAllDeletePosts(){
    var defer=q.defer();
    var query=db.query('SELECT * FROM deleteuser', function(err,posts){
        if(err){
            defer.reject(err);            
        }else{
            defer.resolve(posts);
        }
    });
    return defer.promise;
}



//them user
function addPost(params){
    if(params){
        var defer=q.defer();
        var query=db.query('INSERT users SET ?',params,function(err,result){
            if(err){
                defer.reject(err);                
            }else{
                defer.resolve(result);
            }            
        });
        return defer.promise;   
    }
    return false;

}



module.exports={
    getAllPosts:getAllPosts,
    getPostById:getPostById,
    updatePost:updatePost,
    //deletePost:deletePost,
    addPost:addPost,
    getAllDeletePosts:getAllDeletePosts
}


