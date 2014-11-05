var express = require('express');
var router = express.Router();
var user = require('./admin/user');


// app.get('/admin/users', passportConf.isAuthenticated, userController.getList);
// app.get('/admin/user/view/:userId', passportConf.isAuthenticated, userController.findUser);
// app.get('/account/user/edit/:userId', passportConf.isAuthenticated, userController.getUser);
// app.delete('/admin/user/delete/:userId', passportConf.isAuthenticated, userController.deleteUser);
// app.post('/account/user/edit/', passportConf.isAuthenticated, userController.postUpdateUser);

// TODO: add passport and only allow users is_admin = 1
router.route('/users').get(user.getList);
router.route('/user/view/:userid').get(user.findUser);

module.exports = router;
