// initialize our faux database
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET

exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};








var projects = [{id:0, title:'California', area:'123'},{id:1, title:'Texas', area:'321'}];

var dashboards = [{"id":0, "indicators":[{"iid":0, "title":"Water Quality", "value":1}] }, {"id":1, "indicators":[{"iid":1, "title":"Water Freshness", "value":4}] }];

var indicators = [ {"iid":0, "parameters":[{"parmid":0, "title":"ph", "value":4}] }, {"iid":1, "parameters":[{"parmid":0, "title":"ferro", "value":123}] } ];


var nextIID = 2;

// util methods
function findMaxProjectId() {
  var highest = 0;
  for (id in projects) {
    if (projects.hasOwnProperty(id)) {
      if(id > highest)
        highest = id;
    }
  }
  return parseInt(highest);
}


function findTitleById(pid) {
  var result = 'NOT FOUND';
  // console.log(projects);
  projects.forEach(function(project){
    if(project.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(project.id == pid){
        result = project.title;
      }
    }
  });
  return result;
}


function findDashboardIndicatorsById(pid) {
  var result = {};
  // console.log(projects);
  dashboards.forEach(function(dashboard){
    if(dashboard.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(dashboard.id == pid){
        result = dashboard.indicators;
      }
    }
  });
  return result;
}



function findIndicatorById(iid){
  var result = {};
  // console.log(projects);
  dashboards.forEach(function(dashboard){
    if(dashboard.hasOwnProperty('id') ){
      dashboard.indicators.forEach(function(indicator){
        if(indicator.iid == iid){
          result = indicator;
        }
      });
    }
  });
  return result;
}


function findIndicatorParametersByIId(iid) {
  var result = {};
  // console.log(projects);
  indicators.forEach(function(indicator){
    if(indicator.hasOwnProperty('iid') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(indicator.iid == iid){
        result = indicator.parameters;
      }
    }
  });
  return result;
}



// get
exports.getProjects = function(req, res){
  res.json(projects);
};

// post
exports.addProject = function(req, res){
  console.log('API call: addProject');
  req.body.id = findMaxProjectId()+1;
  console.log(req.body);
  // projects.push({title:'New York', area:'231'});
  projects.push(req.body);

  dashboards.push({"id":req.body.id, "indicators":[] });
  console.log(dashboards);

  // res.json(req.body);
  res.json(projects);
};


exports.getDashboard = function(req, res){
  console.log('API call: getDashboard');
  var pid = req.params.pid;
  var title = findTitleById(pid);
  console.log('title is: '+title);

  var indicators = findDashboardIndicatorsById(pid);
  console.log(indicators);

  var result = {};
  result.title = title;
  result.indicators = indicators;
  res.json(result);
};


exports.getIndicator = function(req, res){
  console.log('API call: getIndicator');
  var iid = req.params.iid;
  var result = {};

  var indicator = findIndicatorById(iid);
  var parameters = findIndicatorParametersByIId(iid);

  result.indicator = indicator;
  result.parameters = parameters;

  res.json(result);
};

exports.addIndicator = function(req, res){
  console.log('API call: addIndicator');
  console.log(req.body);

  var pid = req.params.pid;

  req.body.iid = nextIID;
  nextIID++;

  var indicators = findDashboardIndicatorsById(pid);
  indicators.push(req.body);
  console.log(indicators);


  res.json(indicators);
};

exports.addDashboardWidget = function(req, res){
  console.log('API call: addDashboardWidget');
  var pid = req.params.pid;

  console.log(req.body);
  // projects.push({title:'New York', area:'231'});
  projects.push(req.body);
  // res.json(req.body);
  res.json(projects);
};

