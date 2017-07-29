var express = require('express');
var router = express.Router();
var msg="";

/*Get home page */
router.get('/', function(req, res, next){
  res.render('index', {title: 'login_demo'});
});
/* Post home page. */
router.post('/', function(req, res, next) {
  var db = req.con;
  //check user exist
  var userName = req.body.userName;
  var passwd = req.body.passwd;

  console.log(userName + passwd);
  var query = db.query('SELECT * FROM USER WHERE USERNAME=? AND PASSWD=?',[userName, passwd], function(err, rows){
    if(err){
      console.log("error exist");
      res.sendStatus(500);
    }

    var count = rows.length;
    if(count == 0){
      console.log("user doesn't exist");
      req.session.error='用户名不存在或密码错误';
      res.sendStatus(404);
    }
    if(count == 1){
      msg = "Welcome\t" + userName;
      console.log(msg);
      req.session.user = rows;
      res.sendStatus(200);
    }
    
  })

});


router.get('/afterLogin', function(req, res, next){
   res.render('afterLogin', {title: 'AFTER LOGIN', msg: msg});
});

router.get('/Register', function(req, res, next){
  res.render('Register', {title: 'Register'});
});

router.post('/Register', function(req, res, next){
    var db=req.con;
    var userName = req.body.userName;
    var passwd = req.body.passwd;

    var query = db.query('SELECT * FROM USER WHERE USERNAME=?',[userName], function(err, rows){
        if(err){
          console.log('error exist');
          req.session.error='网络异常错误';
          res.sendStatus(500);
        }
        else{
        var count = rows.length;
        //  无人注册
        if(count == 0){
            var qur = db.query('INSERT INTO USER(USERNAME, PASSWD) VALUES (?,?)', [userName, passwd], function(err, rows){
              if(err) res.sendStatus(500);
              else{
                 req.session.error='用户名创建成功';
                 res.sendStatus(200);
              }
            });
           
        }
        else{
          console.log("user has existed");
          req.session.error='用户名已经存在';
          res.sendStatus(500);
        }
      }
      
    });
});

module.exports = router;
