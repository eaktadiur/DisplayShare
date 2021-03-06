var user = require('../../models/user');

/**
 * GET /
 * campaign page.
 */

exports.getList = function(req, res){
  user.find({},function(err, users) {
      res.send(JSON.stringify(users));
  });
}

exports.findUser = function(req, res){
  var user_id = req.params.userid;
  user.findOne({_id: user_id}, function(err, user){
    res.send(JSON.stringify(user));
  });
}

exports.getUser = function(req, res){
  var userId = req.param('userId');
  user.findOne({_id: userId}, function(err, userDeta){
    console.log(userDeta);
    res.render('account/userEdit', { title: 'Edit User' , userDetail: userDeta});
  });
}

exports.deleteUser = function(req, res){
  var userId = req.param('userId');
  console.log(userId);
  console.log('-----------------');
    user.remove({ _id : userId}, function(err, user) {
      if (err)
        res.send(err);
      res.send('Delete successfully');
      // // get and return all the user after you delete
      // user.findOne({ _id: userId},function(err, user) {
      //   if (err)
      //     res.send(err)
      //   res.json(user);
      // });
    });
}

exports.postUpdateUser = function(req, res){
  var userId = req.body.userId;
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  console.log(userId);
  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account/user/edit/'+userId);
  }

  user.findById(userId, function(err, user) {
    if (err) return next(err);

    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/campaign#/campaign/users');
    });
  });
}