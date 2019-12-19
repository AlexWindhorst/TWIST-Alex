var session = require('express-session');

exports.login = function(req, res, next){
  sess = req.session;
  if(req.body.user === 'admin' && req.body.pass == 'admin'){
    sess.user = req.body.user;
    sess.password = req.body.pass;
    return next();
  }else{
    res.render('login/login');
  }
}

exports.hasAuth = function(req, res, next){
  sess = req.session;
  if(sess.user === 'admin' && sess.password == 'admin'){
    return next();
  }else{
    res.redirect('/login');
  }
}

exports.logout = function(req, res, next){
  sess=req.session;
  sess.destroy((err) => {
  if (err){
    return console.log(err);
  }
  next();
  });
}