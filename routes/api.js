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






// DATA

var projects = [{id:0, title:'Madeira', area:'123'},{id:1, title:'Texas', area:'321'}];

var dashboards = [{"id":0, "indicators":[{"iid":0, "title":"Water Quality", "value":"Good", "unit":'', "alarm":'yes', "coord":[{"x":32.666667, "y": -16.85}]}, {"iid":2, "title":"Location", "value":"Monte", "unit":'', "alarm":'no', "coord":[{"x":32.666667, "y": -16.95}]}] }, {"id":1, "indicators":[{"iid":1, "title":"Budget", "value":4, "unit":"Eur", "alarm":'no'}] }];

var indicators = [ {"iid":0, "parameters":[{"parmid":0, "title":"ph", "value":4, "unit":""}] }, 
                  {"iid":1, "parameters":[{"parmid":0, "title":"Ferro", "value":123, "unit":"mg/l"}] },
                  {"iid":2, "parameters":[] }  ];


var nextIID = 3;
var nextParmId = 2;


// UTILS
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
  var result = [];
  // console.log(projects);
  indicators.forEach(function(indicator){
    if(indicator.hasOwnProperty('iid') ){
      // console.log(indicator.id + " " + iid);
      // console.log(indicator.id == iid);
      console.log(indicator);
      if(indicator.iid == iid){
        result = indicator.parameters;
      }
    }
  });
  return result;
}



function findParameterByParmId(iid, parmid){
  var result = {};
  var parameters = findIndicatorParametersByIId(iid);
  parameters.forEach(function(parameter){
    if(parameter.parmid == parmid)
      result = parameter;
  });
  return result;
}



function getLocationsByPId(pid){
  var result = [];
  // console.log(projects);
  dashboards.forEach(function(indicator){
    if(indicator.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(indicator.id == pid){
        // console.log(indicator.indicators);
        indicator.indicators.forEach(function(ind){
          console.log(ind.coord);
          if(ind.coord != undefined)
            result.push( {"x": ind.coord[0].x, "y": ind.coord[0].y } );
        });
      }
    }
  });
  return result;
}


// METHODS:



// get
exports.getProjects = function(req, res){
  res.json(projects);
};

// post
exports.addProject = function(req, res){
  console.log('API call: addProject');
  req.body.id = findMaxProjectId()+1;
  // console.log(req.body);
  // projects.push({title:'New York', area:'231'});
  projects.push(req.body);

  dashboards.push({"id":req.body.id, "indicators":[] });
  // console.log(dashboards);

  // res.json(req.body);
  res.json(projects);
};


exports.getDashboard = function(req, res){
  console.log('API call: getDashboard');
  var pid = req.params.pid;
  var title = findTitleById(pid);
  // console.log('title is: '+title);

  var indicators = findDashboardIndicatorsById(pid);
  // console.log(indicators);

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
  // console.log(req.body);

  var pid = req.params.pid;

  req.body.iid = nextIID;
  nextIID++;

  var indicatorsResult = findDashboardIndicatorsById(pid);
  indicatorsResult.push(req.body);

  // init parameters for iid
  indicators.push( {"iid":req.body.iid, "parameters":[]} );
  // console.log(indicators);


  res.json(indicatorsResult);
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

exports.getParameter = function(req, res){
  console.log('API call: getParameter');
  var iid = req.params.iid;
  var parmid = req.params.parmid;
  var result = {};

  var parameter = findParameterByParmId(iid, parmid);

  result = parameter;

  res.json(result);
};


exports.addParameter = function(req, res){
  console.log('API call: addParameter');
  var result = {};
  var pid = req.params.pid;
  var iid = req.params.iid;
  console.log("pid: "+pid+" iid: "+iid);
  // console.log(req.body);
  req.body.parmid = nextParmId;
  nextParmId++;

  var parameters = findIndicatorParametersByIId(iid);
  
  console.log("Pushing parm into parms");
  console.log(parameters);
  parameters.push(req.body);

  console.log(parameters);


  console.log("Dashboards");
  console.log(dashboards);
  console.log("Indicators");
  console.log(indicators);

  res.json(parameters);
};


exports.geoapi = function(req, res){
  console.log('API call: geoapi');
  var pid = req.params.pid;
  console.log(pid);
  var loc = getLocationsByPId(pid);
  console.log(loc);
  res.json(loc);
};