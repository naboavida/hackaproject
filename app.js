
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;



var users = [
    { id: 1, username: 'naboavida', password: 'pass', email: 'naboavida@example.com' }
  , { id: 2, username: 'jpsantos', password: 'pass', email: 'jpsantos@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  // done(null, user.id);
  console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser");
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));



var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}



/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
// app.get('/dashboard', routes.dashboard);
// app.get('/projects', routes.projects);
app.get('/addProject', ensureAuthenticated, routes.addProject);
// app.get('/addWidget/:pid', routes.addWidget);
// app.get('/dashboard/:pid', routes.dashboard);

app.get('/partials/:name', ensureAuthenticated, routes.partials);



app.get('/login', function(req, res){
	console.log("login!!");
	console.log(req.user);
  res.render('login', {locals:{ user: req.user, message: req.flash('error') }} );
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login

var globalUser = {};

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true } ),
  function(req, res) {
  	console.log("login ok!!");
  	console.log(req.user);
  	app.set('globalUser', req.user);
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  console.log("LOGOUT!!");
  req.logout();
  res.redirect('/');
});






// API

app.get('/api/user', api.getUser);

// app.get('/api/projects', api.getProjects);
app.get('/api/projects', api.getProjectsUsername);
// app.post('/api/projects', api.addProject);
app.post('/api/projects', api.addProjectUsername);
app.delete('/api/project/:pid', api.deleteProject);

app.get('/api/dashboard/:pid', api.getDashboard);
app.get('/api/indicator/:iid', api.getIndicator);
app.get('/api/indicator/:pointiid/:pointid', api.getPointIndicator);
app.post('/api/indicator/:pid', api.addIndicator);
app.delete('/api/indicator/:pid/:iid', api.deleteIndicator);

app.get('/api/pointdashboard/:pid/:pointid', api.getDashboardPoint);
app.post('/api/indicator/:pid/:pointid', api.addPointIndicator);

app.get('/api/parameter/:iid/:parmid', api.getParameter);
app.get('/api/parameterPoint/:pointiid/:pointparmid', api.getParameterPoint);
app.post('/api/parameter/:pid/:iid', api.addParameter);
app.delete('/api/parameter/:iid/:parmid', api.deleteParameter);
app.post('/api/parameter/:pid/:pointiid/:pointid', api.addParameterPoint);
app.get('/api/parameterReadings/:iid/:parmid', api.getParameterReadings);
app.post('/api/parameterReadings/:iid/:parmid', api.addParameterReadings);
app.get('/api/parameterPointReadings/:pointiid/:pointparmid', api.getParameterPointReadings);
app.post('/api/parameterPointReadings/:pointiid/:pointparmid', api.addParameterPointReadings);
app.post('/api/parameterPointMultipleReadings/:pointiid/:pointparmid', api.addParameterPointMultipleReadings);

app.get('/api/orderedPointValuesOfParameter/:pid/:iid/:parmid', api.getOrderedPointValuesOfParameter);

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

app.get('/geoapi/:pid', api.geoapi);
app.get('/geoapi/:pid/:pointid', api.geoapiPoint);
app.post('/geoapi/addPoint/:pid', api.geoapiAddPoint);
app.delete('/geoapi/deletePoint/:pointid', api.geoapiDeletePoint);

app.get('/api/activities/:pid', api.getActivities);
app.get('/api/activities/:pid/:pointid', api.getActivitiesPoint);
app.post('/api/activities/:pid', api.setActivities);
app.post('/api/activities/:pid/:pointid', api.setActivitiesPoint);

app.get('/api/alerts', api.getAlerts);



// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}