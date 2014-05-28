
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
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
app.get('/addProject', routes.addProject);
// app.get('/addWidget/:pid', routes.addWidget);
// app.get('/dashboard/:pid', routes.dashboard);

app.get('/partials/:name', routes.partials);



// API

app.get('/api/projects', api.getProjects);
app.post('/api/projects', api.addProject);

app.get('/api/dashboard/:pid', api.getDashboard);
app.get('/api/indicator/:iid', api.getIndicator);
app.get('/api/indicator/:pointiid/:pointid', api.getPointIndicator);
app.post('/api/indicator/:pid', api.addIndicator);

app.get('/api/pointdashboard/:pid/:pointid', api.getDashboardPoint);
app.post('/api/indicator/:pid/:pointid', api.addPointIndicator);

app.get('/api/parameter/:iid/:parmid', api.getParameter);
app.get('/api/parameterPoint/:pointiid/:pointparmid', api.getParameterPoint);
app.post('/api/parameter/:pid/:iid', api.addParameter);
app.post('/api/parameter/:pid/:pointiid/:pointid', api.addParameterPoint);
app.get('/api/parameterReadings/:iid/:parmid', api.getParameterReadings);
app.post('/api/parameterReadings/:iid/:parmid', api.addParameterReadings);
app.get('/api/parameterPointReadings/:pointiid/:pointparmid', api.getParameterPointReadings);
app.post('/api/parameterPointReadings/:pointiid/:pointparmid', api.addParameterPointReadings);

app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

app.get('/geoapi/:pid', api.geoapi);
app.get('/geoapi/:pid/:pointid', api.geoapiPoint);
app.post('/geoapi/addPoint/:pid', api.geoapiAddPoint);

app.get('/api/activities/:pid', api.getActivities);
app.post('/api/activities/:pid', api.setActivities);



// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
