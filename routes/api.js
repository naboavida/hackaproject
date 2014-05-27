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


var projects = [{"id":0, "title":'Water Quality in São Tomé', "location": "São Tomé", "area":'123'},
                {"id":1, "title":'Oilfields for Big Oil Company', "location":"Texas, USA", "area":'321'}];

var dashboards = [{"id":0, "indicators":[{"iid":0, "title":"Water Quality", "value":"Good", "unit":'', "alarm":'yes', "coord":[{"x":32.666667, "y": -16.85}], 
                                                    "readings":[]},
                                        {"iid":2, "title":"Location", "value":"Monte", "unit":'', "alarm":'no', "coord":[{"x":32.666667, "y": -16.95}]}] }, 
                  {"id":1, "indicators":[{"iid":1, "title":"Budget", "value":4, "unit":"Eur", "alarm":'no'}] }];

var indicators = [ {"iid":0, "parameters":[{"parmid":0, "title":"ph", "value":7.3, "unit":"", 
                                                    "readings":[[0, 3.4], [1,3.5], [2,4.2], [3,4.4], [4,4.5], [5,5.9], [6,7.3] ]  }] }, 
                  {"iid":1, "parameters":[{"parmid":1, "title":"Ferro", "value":123, "unit":"mg/l", 
                                                    "readings":[[0, 123], [1,113.5], [2,123.5], [3,133.5], [4,153.5] ]  }] },
                  {"iid":2, "parameters":[] }  ];

var def_date = new Date("June 1, 2014 11:13:00");

var activities = [ {"id":0, "activitiesList":[{"aid":0, "title":"Woo Sampling", "start":'2014-05-29T22:00:00.000Z', "end":"", "allDay":true}, {"aid":1, "title":"pH Sampling", "start":'2014-05-30T22:00:00.000Z', "end":"", "allDay":true}] }, 
                  {"id":1, "activitiesList":[] },
                  {"id":2, "activitiesList":[] }  ];


var pointDashboards = [ {"id": 0, "pointIndicators": [ {"pointid": 0, "coord":[{"x":32.666667, "y": -16.85}], 
                                                                "indicators":[{"pointiid":0, "title":"Water Ruality", "value":4, "unit":"mg", "alarm":"yes" }] }, 
                                                       {"pointid": 1, "coord":[{"x":32.666667, "y": -16.95}],
                                                                "indicators":[] }
                                                         ] },
                        {"id": 1, "pointIndicators":[] } ];


var nextIID = 3;
var nextParmId = 2;
var nextAID = 2;

var nextPointIID = 2;


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


function findProjectById(pid) {
  var result = {};
  result.title = 'NOT FOUND';
  // console.log(projects);
  projects.forEach(function(project){
    if(project.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(project.id == pid){
        result = project;
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


function findPointIndicatorsById(pid, pointid) {
  var result = {};
  // console.log(projects);
  pointDashboards.forEach(function(pointDashboard){
    if(pointDashboard.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(pointDashboard.id == pid){
        pointDashboard.pointIndicators.forEach(function(pointIndicator){
          if(pointIndicator.pointid == pointid)
            result = pointIndicator.indicators;
        });
        // result = dashboard.indicators;
      }
    }
  });
  return result;
}


function findDashboardIndicatorsIIDById(pid) {
  var result = [];
  // console.log(projects);
  dashboards.forEach(function(dashboard){
    if(dashboard.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(dashboard.id == pid){
        for(var ind in dashboard.indicators)
          result.push(ind);
          // console.log(dashboard.indicators[ind]);
        // result.push(dashboard.indicators.iid);
        // console.log("pushing:");
        // console.log(dashboard.indicators);
      }
    }
  });
  return result;
}


function findProjectActivitiesById(pid){
  var result = [];
  activities.forEach(function(entry){
    if(entry.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(entry.id == pid){
          result = entry.activitiesList;
          // console.log(dashboard.indicators[ind]);
        // result.push(dashboard.indicators.iid);
        // console.log("pushing:");
        // console.log(dashboard.indicators);
      }
    }
  });
  return result;
}


function setActivityByPid(pid, obj){
  var result = [];
  console.log('setActivityByPid');
  activities.forEach(function(entry){
    if(entry.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(entry.id == pid){
          entry.activitiesList.forEach(function(activity){
            if(activity.aid == obj.aid){
              console.log(obj.start);
              activity.start = obj.start;
              activity.end = obj.end;
              activity.allDay = obj.allDay;
              // falta actualizar o end e o title
              console.log(entry.activitiesList);
            }

          });
          // console.log(dashboard.indicators[ind]);
        // result.push(dashboard.indicators.iid);
        // console.log("pushing:");
        // console.log(dashboard.indicators);
      }
    }
  });
  return result;
}



function addActivityByPid(pid, obj){
  var result = [];
  console.log('addActivityByPid');
  console.log(obj);
  activities.forEach(function(entry){
    if(entry.hasOwnProperty('id') ){
      // console.log(project.id + " " + pid);
      // console.log(project.id == pid);
      if(entry.id == pid){
          obj.aid = nextAID;
          entry.activitiesList.push(obj);
          nextAID++;
          // console.log(dashboard.indicators[ind]);
        // result.push(dashboard.indicators.iid);
        // console.log("pushing:");
        // console.log(dashboard.indicators);
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
      // console.log(indicator);
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



// function getLocationsByPId(pid){
//   var result = [];
//   // console.log(projects);
//   dashboards.forEach(function(indicator){
//     if(indicator.hasOwnProperty('id') ){
//       // console.log(project.id + " " + pid);
//       // console.log(project.id == pid);
//       if(indicator.id == pid){
//         // console.log(indicator.indicators);
//         indicator.indicators.forEach(function(ind){
//           // console.log(ind.coord);
//           if(ind.coord != undefined)
//             result.push( {"x": ind.coord[0].x, "y": ind.coord[0].y } );
//         });
//       }
//     }
//   });
//   return result;
// }


function getLocationsByPId(pid){
  var result = [];
  // console.log(projects);

  pointDashboards.forEach(function(indicator){
    if(indicator.hasOwnProperty('id') ){
      if(indicator.id == pid){
        indicator.pointIndicators.forEach(function(ind){
          if(ind.coord != undefined)
            result.push( {"pointid":ind.pointid , "x": ind.coord[0].x, "y": ind.coord[0].y } );
        });
      }
    }
  });
  return result;
}

function getLocationsByPIdPointid(pid, pointid){
  var result = [];
  // console.log(projects);

  pointDashboards.forEach(function(indicator){
    if(indicator.hasOwnProperty('id') ){
      if(indicator.id == pid){
        indicator.pointIndicators.forEach(function(ind){
          if(ind.pointid == pointid)
            result.push( {"pointid":ind.pointid , "x": ind.coord[0].x, "y": ind.coord[0].y } );
        });
      }
    }
  });
  return result;
}


function getPointIndicatorById(pid){
  var result = [];
  console.log("getPointIndicatorById");

  pointDashboards.forEach(function(indicator){
    if(indicator.hasOwnProperty('id') ){
      // console.log(indicator);

      if(indicator.id == pid){
        result = indicator.pointIndicators;
      }
    }
  });
  return result;
}






// ************************************************************************************************************************************
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// ************************************************************************************************************************************



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

  pointDashboards.push({"id": req.body.id, "pointIndicators":[] });
  

  // res.json(req.body);
  res.json(projects);
};


exports.getDashboard = function(req, res){
  console.log('API call: getDashboard');
  var pid = req.params.pid;
  var project = findProjectById(pid);
  // console.log('title is: '+title);

  var indicators = findDashboardIndicatorsById(pid);
  // console.log(indicators);

  var result = {};
  result.project = project;
  result.indicators = indicators;

  res.json(result);
};



exports.getDashboardPoint = function(req, res){
  console.log('API call: getDashboardPoint');
  var pid = req.params.pid;
  var pointid = req.params.pointid;
  console.log(pid + " " + pointid);

  var project = findProjectById(pid);
  var indicators = findPointIndicatorsById(pid, pointid);

  var result = {};
  result.project = project;
  result.indicators = indicators;
  console.log(indicators);
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

  var indicatorsResult = findDashboardIndicatorsById(pid);
  indicatorsResult.push(req.body);

  // init parameters for iid
  indicators.push( {"iid":req.body.iid, "parameters":[]} );
  // console.log(indicators);


  res.json(indicatorsResult);
};


exports.addPointIndicator = function(req, res){
  console.log('API call: addPointIndicator');
  console.log(req.body);

  var pid = req.params.pid;
  var pointid = req.params.pointid;

  req.body.pointiid = nextPointIID;
  nextPointIID++;

  var indicatorsResult = findPointIndicatorsById(pid, pointid);
  console.log(indicatorsResult);
  indicatorsResult.push(req.body);

  // // dps falta criar a entrada vazia no pointIndicators por causa dos parametros
  // indicators.push( {"iid":req.body.iid, "parameters":[]} );

  console.log(req.body);

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
  // console.log(parameters);
  parameters.push(req.body);

  // console.log(parameters);


  console.log("Dashboards");
  // console.log(dashboards);
  console.log("Indicators");
  // console.log(indicators);

  res.json(parameters);
};


exports.geoapi = function(req, res){
  console.log('API call: geoapi');
  var pid = req.params.pid;
  // console.log(pid);
  var loc = getLocationsByPId(pid);
  // console.log(loc);
  res.json(loc);
};


exports.geoapiPoint = function(req, res){
  console.log('API call: geoapiPoint');
  var pid = req.params.pid;
  var pointid = req.params.pointid;
  // console.log(pid);
  var loc = getLocationsByPIdPointid(pid, pointid);
  // console.log(loc);
  res.json(loc);
};

exports.geoapiAddPoint = function(req, res){
  console.log('API call: geoapiAddPoint');
  console.log(req.body);
  var pid = req.params.pid;

  var pointIndicator = getPointIndicatorById(pid);

  var currPointid = nextPointIID;
  nextPointIID++;
  var pointToAdd = { "pointid": currPointid, "coord":[{"x":req.body.lat, "y":req.body.lng}], "indicators":[]};

  pointIndicator.push(pointToAdd);

  // {"pointid": 1, "coord":[{"x":32.666667, "y": -16.95}],
  //                                                               "indicators":[] }

  // obter proximo pointid
  // adicionar ao pointToAdd bem como os restantes x, y
  // adicionar o pointToAdd ao pointIndicator
  console.log(pointIndicator);

  console.log("add geo point");
  console.log(pointDashboards);

  res.json(pointToAdd);
};



// obter todas as activities de um determinado projecto.
exports.getActivities = function(req, res){
  console.log('API call: getActivities');
  var pid = req.params.pid;

  // obter todos os indicadores de um projecto
  var activities_arr = findProjectActivitiesById(pid);
  // console.log(activities_arr);
  // para cada indicador, obter as tarefas

  
  // var activitiesList
  // for(var activitiesList in activities){
  //   console.log(activitiesList);
  // }
  
  // incluir as tarefas na variavel de resultado
  res.json(activities_arr);
}


exports.setActivities = function(req, res){
  console.log('API call: setActivities');
  var today = new Date();
  console.log(req.body);
  var pid = req.params.pid;

  console.log(req.body.aid != null);
  if(req.body.aid != undefined && req.body.aid != null){
    if( typeof(req.body) == 'object' ){
      var aid = req.body.aid;
      console.log("setActivityByPid");

      setActivityByPid(pid, req.body);
      // see if we have the aid on activities    
      //else add the req.body to the pid on activities
    }
  } else {
    // were adding a new one because it has no aid (activity id)
    addActivityByPid(pid, req.body);
  }

  res.json(req.body);
}

exports.getParameterReadings = function(req, res){
  console.log('API call: getParameterReadings');
  var pid = req.params.pid;
  var iid = req.params.iid;
  var parmid = req.params.parmid;

  var parameter = findParameterByParmId(iid, parmid);
  console.log(parameter.readings);
  res.json(parameter.readings);
}