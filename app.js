var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var _ = require('lodash');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
//mongoose.set('debug', true); // show mongoose queries
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');
var multer = require('multer');





/**
 * API keys and Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');


/**
 * Create Express server.
 */

var app = express();

/**
 * Connect to MongoDB.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * CSRF whitelist.
 */

var csrfExclude = ['/url1', '/url2'];


/**
 * Express configuration.
 */
app.use(multer({dest:__dirname +'/public/uploads/'}));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(function(req, res, next) {
//   // CSRF protection.
//   if (_.contains(csrfExclude, req.path)) return next();
//   csrf(req, res, next);
// });
app.use(function(req, res, next) {
  // Make user object available in templates.
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // Remember original destination before login.
  var path = req.path.split('/')[1];
  if (/auth|login|logout|signup|fonts|favicon/i.test(path)) {
    return next();
  }
  req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));






/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');
var loginController = require('./controllers/login');

var campaignController = require('./controllers/campaign')
var layerController = require('./controllers/layer')
var contactController = require('./controllers/contact')
var displayController = require('./controllers/display')
var migrate = require('./routes/migrate');
var admin = require('./routes/admin');
var display = require('./routes/display');


/**
 * Application routes.
 */

app.use('/migrate', migrate);
app.use('/admin', admin);
// app.use('/display', display);

app.get('/', homeController.index);
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
app.get('/logout', loginController.logout);

app.get('/display/getlistByUserId', passportConf.isAuthenticated, display.getlistByUserId)
app.put('/display/edit/:id', passportConf.isAuthenticated, display.putUpdate)
app.post('/upload', display.putfileUloadUpdate)

// app.get('/campaign', passportConf.isAuthenticated, campaignController.index);
app.get('/campaigns', passportConf.isAuthenticated, campaignController.getList);
app.post('/admin/campaign/add/new', passportConf.isAuthenticated, campaignController.postAdd);
app.get('/campaign/view/:id', passportConf.isAuthenticated, campaignController.getById);
app.post('/admin/display/add/:campainId/:displayId', passportConf.isAuthenticated, campaignController.postTagAdd);
app.put('/campaign/edit/:id', passportConf.isAuthenticated, campaignController.userUpdate);

// Layer 
app.get('/admin/layer/view/:id', passportConf.isAuthenticated, layerController.getById);
app.put('/admin/layer/edit/:id', passportConf.isAuthenticated, layerController.updateLayer);
app.post('/admin/layer/add/:id', passportConf.isAuthenticated, layerController.postLayer)
app.delete('/admin/layer/delete/:id', passportConf.isAuthenticated, layerController.removeLayer)


//Display
app.get('/admin/display/list/', passportConf.isAuthenticated, displayController.getList);
app.post('/admin/display/add', passportConf.isAuthenticated, displayController.postAdd);
app.post('/admin/credit/add/:id', passportConf.isAuthenticated, displayController.postCreditAdd);
app.put('/admin/display/edit/:id', passportConf.isAuthenticated, displayController.putUpdate);
app.get('/admin/display/view/:id', passportConf.isAuthenticated, displayController.getById);
app.delete('/admin/display/delete/:id', passportConf.isAuthenticated, displayController.removeById);



//Contact
app.post('/contact', passportConf.isAuthenticated, contactController.postContact);



app.get('/forgot', loginController.getForgot);
app.post('/forgot', loginController.postForgot);
app.get('/reset/:token', loginController.getReset);
app.post('/reset/:token', loginController.postReset);
app.get('/signup', loginController.getSignup);
app.post('/signup', loginController.postSignup);



app.get('/admin/user/profile', passportConf.isAuthenticated, loginController.getProfile);
app.get('/account', passportConf.isAuthenticated, loginController.getAccount);

app.put('/account/profile', passportConf.isAuthenticated, loginController.postUpdateProfile);
app.post('/account/profile', passportConf.isAuthenticated, loginController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, loginController.postUpdatePassword);
app.put('/account/password', passportConf.isAuthenticated, loginController.postUpdatePassword);
app.put('/account/password/:userId', passportConf.isAuthenticated, loginController.postUpdateUserPassword);
app.post('/account/password/:userId', passportConf.isAuthenticated, loginController.postUpdateUserPassword);
app.post('/account/delete', passportConf.isAuthenticated, loginController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, loginController.getOauthUnlink);



/**
 * OAuth routes for sign-in.
 */


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});


/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end, after all routes.
 */

app.use(errorHandler());


/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});


module.exports = app;
