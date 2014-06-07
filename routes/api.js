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




var pg = require('pg');
// var dbUrl = "tcp://postgres:maxtamaxta@localhost/nunoteste";
var conString = "postgres://postgres:maxtamaxta@localhost/nunoteste";
// var conString = "postgres://ufjpppbpugidqy:o86ol2Bz1SqbV8bErgweMKRLLm@ec2-54-197-237-231.compute-1.amazonaws.com/d3bd4tetkfqefb";
var conString = 'postgres://ufjpppbpugidqy:o86ol2Bz1SqbV8bErgweMKRLLm@ec2-54-197-237-231.compute-1.amazonaws.com:5432/d3bd4tetkfqefb';


// var projects = [{"id":0, "title":'Water Quality', "location": "São Tomé", "area":'123'},
//                 {"id":1, "title":'Oilfields', "location":"Texas, USA", "area":'321'}];





// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT * FROM tablea', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log("Number of results: "+result.rows.length);
//     result.rows.forEach(function(row){
//       console.log(row);
//       projects.push({"id":row.id, "title":row.name, "location":"m", "area":"1"});
//     })
//     // console.log(result.rows[0].theTime);
//     //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//     client.end();
//   });
// });


// DATA

// var projects = [{"id":0, "title":'Water Quality', "location": "São Tomé", "area":'123'}];
var projects = [];


var dashboards = [{"id":0, "indicators":[{"iid":0, "title":"Water Quality", "value":"Good", "unit":'', "alarm":'yes', "coord":[{"x":32.666667, "y": -16.85}], 
                                                    "readings":[]},
                                        {"iid":2, "title":"Location", "value":"Monte", "unit":'', "alarm":'no', "coord":[{"x":32.666667, "y": -16.95}]}] }];

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
                                                                "indicators":[{"pointiid":0, "title":"Water Quality", "value":4, "unit":"mg", "alarm":"yes" }] }, 
                                                       {"pointid": 1, "coord":[{"x":32.666667, "y": -16.95}],
                                                                "indicators":[{"pointiid":1, "title":"Water Quality", "value":2, "unit":"mg", "alarm":"yes" }] }
                                                         ] },
                        {"id": 1, "pointIndicators":[] } ];

var pointIndicators = [ {"pointiid":0, "parameters":[ {"pointparmid":0, "title":"ph", "value":3.3, "unit":"lvl", 
                                                    "readings":[[0, 3.4], [1,3.5], [2,4.2], [3,4.4], [4,4.5], [5,5.9], [6,7.3], [7,3.3] ]  } ] },
                        {"pointiid":1, "parameters":[ {"pointparmid":1, "title":"ph", "value":7, "unit":"lvl", 
                                                    "readings":[[0, 3.4], [1,3.5], [2,4.2], [3,4.4], [4,4.5], [5,5.9], [6,7.3], [7,7] ]  },
                                                    {"pointparmid":2, "title":"Ferro", "value":200, "unit":"lvl", 
                                                    "readings":[[0, 100], [1,200], [3,175], [4,200] ]  } ] } ];


var nextIID = 3;
var nextParmId = 2;

var nextAID = 2;

var nextPointID = 2;

var nextPointIID = 2;
var nextPointParmId = 3;



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
  // console.log(dashboards);
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
  // console.log(dashboards);
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

function findIndicatorByPointiid(pointiid){
  var result = {};
  // console.log(projects);
  pointDashboards.forEach(function(dashboard){
    if(dashboard.hasOwnProperty('id') ){
      dashboard.pointIndicators.forEach(function(point){
        point.indicators.forEach(function(indicator){
          if(indicator.pointiid == pointiid){
            result = indicator;
          }
        });
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


function findIndicatorParametersByPointIId(pointiid) {
  var result = [];
  // console.log(projects);
  pointIndicators.forEach(function(pointIndicator){
    if(pointIndicator.hasOwnProperty('pointiid') ){
      // console.log(pointIndicator.id + " " + iid);
      // console.log(pointIndicator.id == iid);
      // console.log(pointIndicator);
      if(pointIndicator.pointiid == pointiid){
        result = pointIndicator.parameters;
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


function findParameterByPointParmId(pointiid, pointparmid){
  var result = {};
  var parameters = findIndicatorParametersByPointIId(pointiid);
  parameters.forEach(function(parameter){
    if(parameter.pointparmid == pointparmid)
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



function ordergetBiggestXInReadings(readings_arr){
  if(readings_arr != undefined && readings_arr != null && readings_arr.length != 0){
    // console.log("LAST READING IS "+readings_arr[readings_arr.length-1][0]);
    return (readings_arr[readings_arr.length-1][0]+1);
  } else {
    return 0;
  }
  // readings_arr is something like [ [date/order, value] ]
}



function findIndexOfProjectByPid(pid){
  console.log("findIndexOfProjectByPid");
  for(var i in projects){
    console.log(projects[i]);
    console.log((projects[i].pid == pid) || (projects[i].id == pid));
    if( (projects[i].pid == pid) || (projects[i].id == pid) ){
      return i;
    }
  }
}







// ************************************************************************************************************************************
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// METHODS:
// ************************************************************************************************************************************



exports.getUser = function(req, res){
  var client = new pg.Client(conString);
  var uid = req.session.passport.user;

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM users WHERE uid = '+uid, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      res.json(result.rows[0]);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
};


// get
exports.getProjects = function(req, res){
  // var projects = [{"id":0, "title":'Water Quality', "location": "São Tomé", "area":'123'}];
  projects = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM projects', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        // console.log(row);
        // projects.push({"id":row.pid, "title":row.title, "location":row.location, "area":row.area});
        // console.log("project added");
        // console.log(projects);
        dashboards.push({"id":row.pid, "indicators":[] });
      })
      projects = result.rows;
      console.log("projects");
      console.log(projects);
      res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
  // res.json(projects);
};




exports.getProjectsUsername = function(req, res){
  console.log("API call: getProjectsUsername");
  var uid = req.session.passport.user;
  console.log("uid: "+uid);

  // var projects = [{"id":0, "title":'Water Quality', "location": "São Tomé", "area":'123'}];
  projects = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // client.query("select * from projects where pid in (select pid_proj from users_projects where uid_user = '"+uid+"');", function(err, result) {
    var q = "select pid, title, area, location from organizations_projects, users, projects where users.oid_org = organizations_projects.oid_org and projects.pid = organizations_projects.pid_proj and uid = "+uid;
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        // console.log(row);
        // projects.push({"id":row.pid, "title":row.title, "location":row.location, "area":row.area});
        // console.log("project added");
        // console.log(projects);
        dashboards.push({"id":row.pid, "indicators":[] });
      })
      projects = result.rows;
      console.log("projects");
      console.log(projects);
      res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
  // res.json(projects);
};

// post
exports.addProject = function(req, res){
  console.log('API call: addProject');

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.pid = row.pid;
        projects.push(req.body);
        dashboards.push({"id":req.body.id, "indicators":[] });

        pointDashboards.push({"id": req.body.id, "pointIndicators":[] });
        res.json(projects);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });



  // req.body.id = findMaxProjectId()+1;
  // console.log(req.body);
  // projects.push({title:'New York', area:'231'});
  

  
  // console.log(dashboards);

  
};



exports.addProjectUsername = function(req, res){
  console.log('API call: addProjectUsername');
  var uid = req.session.passport.user;

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.pid = row.pid;
        projects.push(req.body);
        dashboards.push({"id":req.body.id, "indicators":[] });

        pointDashboards.push({"id": req.body.id, "pointIndicators":[] });

        // var q2 = "INSERT INTO users_projects(uid_user, pid_proj) VALUES('"+uid+"', "+req.body.pid+");";
        var q2 = "INSERT INTO organizations_projects(oid_org, pid_proj) VALUES(  (select distinct oid_org from users where uid = "+uid+"), "+req.body.pid+");";
        client.query(q2, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          res.json(projects);
          client.end();
        });

        
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      
    });
  });



  // req.body.id = findMaxProjectId()+1;
  // console.log(req.body);
  // projects.push({title:'New York', area:'231'});
  

  
  // console.log(dashboards);

  
};


exports.deleteProject = function(req, res){
  console.log('API call: deleteProject');
  var pid = req.params.pid;
  console.log('projects before delete');
  console.log(projects);

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    var q = "DELETE FROM projects WHERE pid = "+pid+" RETURNING pid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);

      // ou entao apenas fazer o select à BD!!!!
      //removeProjectByPid(pid);
      var i = findIndexOfProjectByPid(pid);
      console.log('i');
      console.log(i);
      projects.splice(i, 1);
      
      // ou entao apenas fazer o select à BD!!!!

      console.log('projects after delete');
      console.log(projects);

      res.json(projects);
      client.end();
    });
  });

  
};

exports.getDashboard = function(req, res){
  console.log('API call: getDashboard');
  var pid = req.params.pid;
  var uid = req.session.passport.user;
  var project = findProjectById(pid);
  // console.log('title is: '+title);

  // var indicators = findDashboardIndicatorsById(pid);
  var indicators =  [];
  // console.log(indicators);
  var result = {};

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM indicators WHERE pid_proj = "+pid+" and pointid_point IS NULL and pid_proj in (select pid_proj from users_projects where uid_user = "+uid+");";
    // NA QUERY TB QUEREMOS EVITAR OS QUE TÊM POINTID! -- done!
    // melhor query? select * from indicators, users_projects where indicators.pid_proj = users_projects.pid_proj and indicators.pid_proj = 1 and pointid_point IS NULL and uid_user = 1
    var q = "select * from indicators where pid_proj = "+pid+" and pointid_point IS NULL and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")"

    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        indicators.push(row);

        
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      result.project = project;
      result.indicators = indicators;

      res.json(result);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });


  
  
};



exports.getDashboardPoint = function(req, res){
  console.log('API call: getDashboardPoint');
  var pid = req.params.pid;
  var pointid = req.params.pointid;
  var uid = req.session.passport.user;
  console.log(pid + " " + pointid);

  var indicators = [];
  var result = {};

  // DEPOIS É PARA FILTRAR NA QUERY POR POINTID TAMBEM!
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "SELECT * FROM indicators WHERE pid_proj = "+pid+" and pointid_point = "+pointid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+");";
    // NA QUERY TB QUEREMOS EVITAR OS QUE TÊM POINTID!
    console.log(q);

    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        indicators.push(row);

      })
      // result.project = project;
      result.indicators = indicators;

      res.json(result);

      client.end();
    });
  });






  // var project = findProjectById(pid);
  // var indicators = findPointIndicatorsById(pid, pointid);

  
  // result.project = project;
  // result.indicators = indicators;
  // console.log(indicators);
  // res.json(result);
};


exports.getIndicator = function(req, res){
  console.log('API call: getIndicator');
  var iid = req.params.iid;
  var uid = req.session.passport.user;
  var result = {};

  // var indicator = findIndicatorById(iid);
  var indicator = [];
  // var parameters = findIndicatorParametersByIId(iid);
  var parameters = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM indicators WHERE iid = "+iid+" ;";
    var q = "select * from indicators where iid = "+iid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results getIndicator1: "+res1.rows.length);
      res1.rows.forEach(function(row){
        console.log(row);
        result.indicator = row;

        var q2 = "select parameters.parmid, parameters.title, parameters.value, parameters.unit, parameters.alarm, parameters.objective, parameters.min, parameters.max, parameters.readings, parameters.iid_ind from parameters, indicators where parameters.iid_ind=indicators.iid and iid_ind = "+iid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
        console.log("QUERY 2 IS: "+q2);
        client.query(q2, function(err, res2) {
          if(err) {
            return console.error('could not connect to postgres', err);
          }
          console.log("Is rows2? "+res2.rows);
          console.log("Number of results getIndicator2: "+res2.rows.length);
          res2.rows.forEach(function(row){
            parameters.push(row);
          });
          result.parameters = parameters;
          res.json(result);
          client.end();
        });

        
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
    });
  });

  
};

exports.getPointIndicator = function(req, res){
  console.log('API call: getPointIndicator');
  var iid = req.params.pointiid;
  var pointid = req.params.pointid;
  var uid = req.session.passport.user;
  var result = {};


  var indicator = [];
  // var parameters = findIndicatorParametersByIId(iid);
  var parameters = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM indicators WHERE iid = "+iid+";";
    var q = "select * from indicators where iid = "+iid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results getIndicator1: "+res1.rows.length);
      res1.rows.forEach(function(row){
        console.log(row);
        result.indicator = row;

        // var q2 = "SELECT * FROM parameters WHERE iid_ind = "+iid+";";
        var q2 = "select parameters.parmid, parameters.title, parameters.value, parameters.unit, parameters.alarm, parameters.objective, parameters.min, parameters.max, parameters.readings, parameters.iid_ind from parameters, indicators where parameters.iid_ind=indicators.iid and iid_ind = "+iid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
        console.log("QUERY 2 IS: "+q2);
        client.query(q2, function(err, res2) {
          if(err) {
            return console.error('could not connect to postgres', err);
          }
          console.log("Is rows2? "+res2.rows);
          console.log("Number of results getIndicator2: "+res2.rows.length);
          res2.rows.forEach(function(row){
            parameters.push(row);
          });
          result.parameters = parameters;
          res.json(result);
          client.end();
        });

        
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
    });
  });




  // var indicator = findIndicatorByPointiid(pointiid);
  // var parameters = findIndicatorParametersByPointIId(pointiid);

  // result.indicator = indicator;
  // result.parameters = parameters;

  // res.json(result);
};

exports.addIndicator = function(req, res){
  console.log('API call: addIndicator');
  console.log(req.body);

  var pid = req.params.pid;

  var indicatorsResult = findDashboardIndicatorsById(pid);

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO indicators(title, unit, alarm, value, readings, pid_proj) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", ARRAY["+req.body.value+"], "+pid+") RETURNING iid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.iid = row.iid;
        // indicatorsResult.push(req.body);
        indicators.push( {"iid":req.body.iid, "parameters":[]} );
        res.json(indicatorsResult);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });  
};

exports.deleteIndicator = function(req, res){
  console.log('API call: deleteIndicator');
  var pid = req.params.pid;
  var iid = req.params.iid;

  var project = findProjectById(pid);

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    var q = "DELETE FROM indicators WHERE iid = "+iid+" RETURNING iid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);

      var q2 = "SELECT * FROM indicators WHERE pid_proj = "+pid+" and pointid_point IS NULL;";
      client.query(q2, function(err, result2) {
        console.log("Number of results: "+result2.rows.length);

        res.json(result2.rows);
        client.end();
      });
    });
  });

  // res.json({});
};


exports.addPointIndicator = function(req, res){
  console.log('API call: addPointIndicator');
  console.log(req.body);

  var pid = req.params.pid;
  var pointid = req.params.pointid;

  var indicatorsResult = findPointIndicatorsById(pid, pointid);

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO indicators(title, unit, alarm, value, readings, pid_proj, pointid_point) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', '"+req.body.value+"', ARRAY["+req.body.value+"], "+pid+", "+pointid+") RETURNING iid;";
    console.log(q);
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.iid = row.iid;
        // indicatorsResult.push(req.body);
        // indicators.push( {"iid":req.body.iid, "parameters":[]} );
        pointIndicators.push({"pointiid":req.body.iid, "parameters":[] });
        res.json(indicatorsResult);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });



  // req.body.pointiid = nextPointIID;
  // nextPointIID++;

  
  // console.log(indicatorsResult);
  // indicatorsResult.push(req.body);

  // // dps falta criar a entrada vazia no pointIndicators por causa dos parametros
  // indicators.push( {"iid":req.body.iid, "parameters":[]} );
  // pointIndicators.push({"pointiid":req.body.pointiid, "parameters":[] });
  

  // console.log(req.body);

  // res.json(indicatorsResult);
};


// exports.addDashboardWidget = function(req, res){
//   console.log('API call: addDashboardWidget');
//   var pid = req.params.pid;

//   console.log(req.body);
//   // projects.push({title:'New York', area:'231'});
//   projects.push(req.body);
//   // res.json(req.body);
//   res.json(projects);
// };


exports.getParameter = function(req, res){
  console.log('API call: getParameter');
  var iid = req.params.iid;
  var parmid = req.params.parmid;
  var uid = req.session.passport.user;
  var result = {};

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM parameters WHERE parmid = "+parmid+";";
    var q = "select parameters.parmid, parameters.title, parameters.value, parameters.unit, parameters.alarm, parameters.objective, parameters.min, parameters.max, parameters.readings, parameters.iid_ind from parameters, indicators where parameters.iid_ind=indicators.iid and parmid="+parmid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")"
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results for getParameter: "+res1.rows.length);
      res1.rows.forEach(function(row){
        console.log(row);
        result = row;
        // res.json(result);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })

      res.json(result);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  // var parameter = findParameterByParmId(iid, parmid);

  // result = parameter;

  // res.json(result);
};



exports.deleteParameter = function(req, res){
  console.log('API call: deleteParameter');

  
  var iid = req.params.iid;
  var parmid = req.params.parmid;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    var q = "DELETE FROM parameters WHERE parmid = "+parmid+" RETURNING parmid;";
    console.log('q: '+q);
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);

      var q2 = "SELECT * FROM parameters WHERE iid_ind = "+iid+";";
      client.query(q2, function(err, result2) {
        console.log("Number of results2: "+result2.rows.length);
        console.log('result2.rows');
        console.log(result2.rows);
        res.json(result2.rows);
        client.end();
      });
    });
  });

  // res.json({});
}




exports.getParameterPoint = function(req, res){
  console.log('API call: getParameterPoint');
  var iid = req.params.pointiid;
  var parmid = req.params.pointparmid;
  var uid = req.session.passport.user;
  var result = {};



  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM parameters WHERE parmid = "+parmid+";";
    var q = "select parameters.parmid, parameters.title, parameters.value, parameters.unit, parameters.alarm, parameters.objective, parameters.min, parameters.max, parameters.readings, parameters.iid_ind from parameters, indicators where parameters.iid_ind=indicators.iid and parmid="+parmid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results for getParameter: "+res1.rows.length);
      res1.rows.forEach(function(row){
        console.log(row);
        result = row;
        // res.json(result);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })

      res.json(result);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });




  // var parameter = findParameterByPointParmId(pointiid, pointparmid);

  // result = parameter;

  // res.json(result);
};


exports.addParameter = function(req, res){
  console.log('API call: addParameter');
  var result = {};
  var pid = req.params.pid;
  var iid = req.params.iid;
  console.log("pid: "+pid+" iid: "+iid);
  // console.log(req.body);
  // req.body.parmid = nextParmId;
  // nextParmId++;
  // req.body.readings = [];

  var parameters = findIndicatorParametersByIId(iid);
  
  // console.log("Pushing parm into parms");
  // console.log(parameters);
  // parameters.push(req.body);

  console.log('req.body addParameter');
  console.log(req.body);


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO parameters(title, unit, alarm, value, objective, min, max, readings, iid_ind) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", "+req.body.objective+", "+req.body.min+", "+req.body.max+", ARRAY["+req.body.value+"], "+iid+") RETURNING parmid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.parmid = row.parmid;
        parameters.push(req.body);
        res.json(parameters);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });


  // console.log("Dashboards");
  // console.log(dashboards);
  // console.log("Indicators");
  // console.log(indicators);

  // res.json(parameters);
};

exports.addParameterPoint = function(req, res){
  console.log('API call: addParameterPoint');
  var result = {};
  var pid = req.params.pid;
  var iid = req.params.pointiid;
  var pointid = req.params.pointid;
  console.log("pid: "+pid+" iid: "+iid+" pointid: "+pointid);
  // console.log(req.body);

  // req.body.pointparmid = nextPointParmId;
  // req.body.readings = [];
  // nextPointParmId++;

  var parameters = findIndicatorParametersByPointIId(iid);


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO parameters(title, unit, alarm, value, objective, min, max, readings, iid_ind) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", "+req.body.objective+", "+req.body.min+", "+req.body.max+", ARRAY["+req.body.value+"], "+iid+") RETURNING parmid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results addParameterPoint: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.parmid = row.parmid;
        parameters.push(req.body);
        res.json(parameters);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });



  
  
  // console.log("Pushing parm into parms");
  // console.log(parameters);
  // parameters.push(req.body);

  // res.json(parameters);
};



exports.geoapi = function(req, res){
  console.log('API call: geoapi');
  var pid = req.params.pid;
  var uid = req.session.passport.user;
  // console.log(pid);
  // var loc = getLocationsByPId(pid);
  var loc = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM points WHERE pid_proj = '+pid+' and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = '+uid+');', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        loc.push(row);
      })
      console.log("loc");
      console.log(loc);
      res.json(loc);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  // console.log("loc");
  // console.log(loc);
  // res.json(loc);
};


exports.geoapiPoint = function(req, res){
  console.log('API call: geoapiPoint');
  var pid = req.params.pid;
  var pointid = req.params.pointid;
  var uid = req.session.passport.user;
  // console.log(pid);

  var loc = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // client.query('SELECT * FROM points WHERE pid_proj = '+pid+' and pointid = '+pointid, function(err, result) {
    client.query('SELECT * FROM points WHERE pid_proj = '+pid+' and pointid = '+pointid+'and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = '+uid+')', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        loc.push(row);
      })
      console.log("loc");
      console.log(loc);
      res.json(loc);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });


  // var loc = getLocationsByPIdPointid(pid, pointid);
  // // console.log(loc);
  // res.json(loc);
};

exports.geoapiAddPoint = function(req, res){
  console.log('API call: geoapiAddPoint');
  console.log(req.body);
  var pid = req.params.pid;

  var pointIndicator = getPointIndicatorById(pid);

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var q = "INSERT INTO points(x, y, location, picturename, pid_proj) VALUES ("+req.body.lat+", "+req.body.lng+", 'EMPTY_LOC', 'EMPTY_JPG', '"+pid+"') RETURNING pointid;";
    console.log("Q is: "+q);
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      var pointToAdd = {};
      result.rows.forEach(function(row){

        pointToAdd = { "pointid": row.pointid, "coord":[{"x":req.body.lat, "y":req.body.lng}], "indicators":[]};


        pointIndicator.push(pointToAdd);


        // console.log(row);
        // req.body.id = row.pid;
        // projects.push(req.body);
        // dashboards.push({"id":req.body.id, "indicators":[] });

        // pointDashboards.push({"id": req.body.id, "pointIndicators":[] });
        // res.json(projects);
        // // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      });
      res.json(pointToAdd);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });





  

  // var currPointid = nextPointID;
  // nextPointID++;
  // var pointToAdd = { "pointid": currPointid, "coord":[{"x":req.body.lat, "y":req.body.lng}], "indicators":[]};

  // pointIndicator.push(pointToAdd);

  // // {"pointid": 1, "coord":[{"x":32.666667, "y": -16.95}],
  // //                                                               "indicators":[] }

  // // obter proximo pointid
  // // adicionar ao pointToAdd bem como os restantes x, y
  // // adicionar o pointToAdd ao pointIndicator
  // console.log(pointIndicator);

  // console.log("add geo point");
  // console.log(pointDashboards);

  // res.json(pointToAdd);
};


exports.geoapiDeletePoint = function(req, res){
  console.log('API call: geoapiDeletePoint');
  var pointid = req.params.pointid;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO projects(title, area, location) VALUES ('"+req.body.title+"', '"+req.body.area+"', '"+req.body.location+"') RETURNING pid;";
    var q = "DELETE FROM points WHERE pointid = "+pointid+" RETURNING pointid;";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);

      // se calhar devolvemos o conjunto de pontos actuais para o pid (project) para mostar as alteracoes à bd!
      // para atacar o problema de dois users apagarem pontos diferentes no mm projecto!

      res.json(pointid);
      client.end();
    });
  });

  // console.log("pointid: "+pointid);
  // res.json(pointid);
};



// obter todas as activities de um determinado projecto.
exports.getActivities = function(req, res){
  console.log('API call: getActivities');
  var pid = req.params.pid;
  var uid = req.session.passport.user;
  var activities_arr = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM activities WHERE pid_proj = '+pid+' AND pointid_point IS NULL and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = '+uid+');', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        activities_arr.push(row);
      })
      res.json(activities_arr);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });


  // // obter todos os indicadores de um projecto
  // var activities_arr = findProjectActivitiesById(pid);
  // // console.log(activities_arr);
  // // para cada indicador, obter as tarefas

  
  // // var activitiesList
  // // for(var activitiesList in activities){
  // //   console.log(activitiesList);
  // // }
  
  // // incluir as tarefas na variavel de resultado
  // res.json(activities_arr);
}

exports.getActivitiesPoint = function(req, res){
  console.log('API call: getActivitiesPoint');
  var pid = req.params.pid;
  var pointid = req.params.pointid;
  var uid = req.session.passport.user;
  var activities_arr = [];

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM activities WHERE pid_proj = '+pid+' AND pointid_point = '+pointid+'and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = '+uid+')', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        activities_arr.push(row);
      })
      res.json(activities_arr);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
}


exports.setActivities = function(req, res){
  console.log('API call: setActivities');
  var today = new Date();
  console.log(req.body);
  var pid = req.params.pid;

  var querySQL = '';

  console.log(req.body.aid != null);
  if(req.body.aid != undefined && req.body.aid != null){
    if( typeof(req.body) == 'object' ){
      var aid = req.body.aid;
      console.log("setActivityByPid");

      querySQL = "UPDATE activities SET start = '"+req.body.start+"'::timestamptz WHERE aid = "+aid+";";
      // setActivityByPid(pid, req.body);
      // // see if we have the aid on activities    
      // //else add the req.body to the pid on activities
    }
  } else {
    // // were adding a new one because it has no aid (activity id)
    // addActivityByPid(pid, req.body);
    // INSERT INTO activities(title, description, responsible, start, allday, pid_proj) VALUES ('Budget Revision', 'The monthly task to revise the operational expenses and profits.', 'João Santos', '2014-06-20 00:00:00.000000', true, 1);
    // querySQL = "INSERT INTO activities(title, description, responsible, start, allday, pid_proj) VALUES ("+req.body.title+", "+req.body.title+") RETURNING aid";
    querySQL = "INSERT INTO activities(title, responsible, start, allday, pid_proj) VALUES ('"+req.body.title+"', '"+req.body.responsible+"', '"+req.body.start+"'::timestamptz, "+req.body.allDay+", "+pid+") RETURNING aid;";
    // console.log('querySQL');
    // console.log(querySQL);
  }

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(querySQL, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.aid = row.aid;
      })
      res.json(req.body);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  
}


exports.setActivitiesPoint = function(req, res){
  console.log('API call: setActivitiesPoint');
  var today = new Date();
  console.log(req.body);
  var pid = req.params.pid;
  var pointid = req.params.pointid;

  var querySQL = '';

  console.log(req.body.aid != null);
  if(req.body.aid != undefined && req.body.aid != null){
    if( typeof(req.body) == 'object' ){
      var aid = req.body.aid;
      console.log("req.body");
      console.log(req.body);

      querySQL = "UPDATE activities SET start = '"+req.body.start+"'::timestamptz WHERE aid = "+aid+" and pointid_point = "+pointid+";";
      // setActivityByPid(pid, req.body);
      // // see if we have the aid on activities    
      // //else add the req.body to the pid on activities
    }
  } else {
    // // were adding a new one because it has no aid (activity id)
    // addActivityByPid(pid, req.body);
    // INSERT INTO activities(title, description, responsible, start, allday, pid_proj) VALUES ('Budget Revision', 'The monthly task to revise the operational expenses and profits.', 'João Santos', '2014-06-20 00:00:00.000000', true, 1);
    // querySQL = "INSERT INTO activities(title, description, responsible, start, allday, pid_proj) VALUES ("+req.body.title+", "+req.body.title+") RETURNING aid";
    querySQL = "INSERT INTO activities(title, responsible, start, allday, pid_proj, pointid_point) VALUES ('"+req.body.title+"', '"+req.body.responsible+"', '"+req.body.start+"'::timestamptz, "+req.body.allDay+", "+pid+", "+pointid+") RETURNING aid;";
    // console.log('querySQL');
    // console.log(querySQL);
  }

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(querySQL, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        req.body.aid = row.aid;
      })
      res.json(req.body);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
}

// to test...
exports.getParameterReadings = function(req, res){
  console.log('API call: getParameterReadings');
  var pid = req.params.pid;
  var iid = req.params.iid;
  var parmid = req.params.parmid;
  var uid = req.session.passport.user;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // NUNOOOOOOOOOOOOO
    // var q = "SELECT readings FROM parameters WHERE parmid = "+parmid+";";
    var q = "select parameters.readings from parameters, indicators where parameters.iid_ind=indicators.iid and parmid="+parmid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
    console.log(q);
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results for getParameterReadings: "+res1.rows.length);
      res1.rows.forEach(function(row){
        var readingsInt = row.readings.map(function(item){
          return parseInt(item, 10);
        });
        console.log(readingsInt);
        result = readingsInt;
        // res.json(result);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })

      res.json(result);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  // var parameter = findParameterByParmId(iid, parmid);
  // console.log(parameter.readings);
  // res.json(parameter.readings);
}


exports.getParameterPointReadings = function(req, res){
  console.log('API call: getParameterPointReadings');
  var pid = req.params.pid;
  var pointiid = req.params.pointiid;
  var parmid = req.params.pointparmid;
  var uid = req.session.passport.user;

  var result = [];


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT readings FROM parameters WHERE parmid = "+parmid+";";
    var q = "select parameters.readings from parameters, indicators where parameters.iid_ind=indicators.iid and parmid="+parmid+" and pid_proj in (select pid_proj from organizations_projects, users where organizations_projects.oid_org = users.oid_org and users.uid = "+uid+")";
    console.log(q);
    client.query(q, function(err, res1) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results for getParameterPointReadings: "+res1.rows.length);
      res1.rows.forEach(function(row){
        var readingsInt = row.readings.map(function(item){
          return parseInt(item, 10);
        });
        var readingsIntArr = [];
        console.log('lennnnnnnn: '+readingsInt.length);
        for(var i = 0; i<readingsInt.length; i++){
          var aux = [i, readingsInt[i]];
          console.log("aux");
          console.log(aux);
          readingsIntArr.push(aux);
        }
        console.log('readingsIntArr');
        console.log(readingsIntArr);

        result = readingsIntArr;
        // res.json(result);
        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      });

      res.json(result);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  // var parameter = findParameterByPointParmId(pointiid, pointparmid);
  // console.log(parameter.readings);
  // res.json(parameter.readings);
}





exports.addParameterReadings = function(req, res){
  console.log('API call: addParameterReadings');
  var iid = req.params.iid;
  var parmid = req.params.parmid;

  console.log(iid + " " + parmid);


  var readingToAdd = [];
  var parameter = findParameterByParmId(iid, parmid);

  // UPDATE parameters SET readings = array_append( (select readings from parameters where parmid=4), '55') WHERE parmid=4;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO parameters(title, unit, alarm, value, objective, min, max, readings, iid_ind) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", "+req.body.objective+", "+req.body.min+", "+req.body.max+", ARRAY["+req.body.value+"], "+iid+") RETURNING parmid;";
    var q = "UPDATE parameters SET readings = array_append( (select readings from parameters where parmid="+parmid+"), '"+req.body.value+"') WHERE parmid="+parmid+";";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results addParameterPoint: "+result.rows.length);
      result.rows.forEach(function(row){
        console.log(row);
        // req.body.parmid = row.parmid;
        // parameters.push(req.body);

        // projects.push({"id":row.pid, "title":row.title, "location":"m", "area":row.area});
      })
      parameter.value = req.body.value;
      res.json(parameter);
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
}


exports.addParameterPointReadings = function(req, res){
  console.log('API call: addParameterPointReadings');
  var iid = req.params.pointiid;
  var parmid = req.params.pointparmid;


  var readingToAdd = [];
  var parameter = {};

  // UPDATE parameters SET readings = array_append( (select readings from parameters where parmid=4), '55') WHERE parmid=4;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO parameters(title, unit, alarm, value, objective, min, max, readings, iid_ind) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", "+req.body.objective+", "+req.body.min+", "+req.body.max+", ARRAY["+req.body.value+"], "+iid+") RETURNING parmid;";
    var q = "UPDATE parameters SET readings = array_append( (select readings from parameters where parmid="+parmid+"), '"+req.body.value+"') WHERE parmid="+parmid+";";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results updateParameterPointReadings: "+result.rows.length);
      var q2 = "UPDATE parameters SET value = "+req.body.value+" where parmid="+parmid+";";
      client.query(q2, function(err, result2){
        if(err) {
          return console.error('error running query', err);
        }
        parameter.value = req.body.value;
        res.json(parameter);
        client.end();
      });


      
      // res.json(projects);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
    });
  });



  // var readingToAdd = [];

  // // console.log(pointiid + " " + pointparmid);

  // // get readings entry for pointiid and pointparmid
  // var parameter = findParameterByPointParmId(pointiid, pointparmid);
  // // console.log(parameter);
  // var readings = parameter.readings;

  
  // parameter.value = req.body.value;

  // // see if date was provided. if not, we need to find the last reading id, increment it and set to readingToAdd

  // var reading_id = ordergetBiggestXInReadings(parameter.readings);
  // // console.log("reading_id : "+reading_id);

  // if(req.body.date == undefined || req.body.date == null || req.body.date == ''){
  //   readingToAdd = [ reading_id, req.body.value ]
  // }

  // // push readingToAdd to the readings array
  // readings.push(readingToAdd);

  // res.json(parameter);
};




exports.addParameterPointMultipleReadings = function(req, res){
  console.log('API call: addParameterPointMultipleReadings');
  var iid = req.params.pointiid;
  var parmid = req.params.pointparmid;

  var readingToAdd = [];
  var parameter = {};

  // UPDATE parameters SET readings = ((select readings from parameters where parmid=4) || ARRAY['55'::character varying, '33']) WHERE parmid=4;
  // mas para isto é preciso que construa o ARRAY com ::character varying antes!

  var str = '';
  for(var i = 0; i < req.body.length; i++){
    str += "'"+req.body[i]+"'";
    if(i==0)
      str+="::character varying"
    if(i<req.body.length-1)
      str+=", "
  }

  console.log("Final string:");
  console.log(str);

  // var q = "UPDATE parameters SET readings = array_append( (select readings from parameters where parmid="+parmid+"), '"+req.body.value+"') WHERE parmid="+parmid+";";

  // UPDATE parameters SET readings = array_append( (select readings from parameters where parmid=4), '55') WHERE parmid=4;


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "INSERT INTO parameters(title, unit, alarm, value, objective, min, max, readings, iid_ind) VALUES ('"+req.body.title+"', '"+req.body.unit+"', '"+req.body.alarm+"', "+req.body.value+", "+req.body.objective+", "+req.body.min+", "+req.body.max+", ARRAY["+req.body.value+"], "+iid+") RETURNING parmid;";
    var q = "UPDATE parameters SET readings = ((select readings from parameters where parmid="+parmid+") || ARRAY["+str+"]) WHERE parmid="+parmid+";";
    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results updateParameterPointReadings: "+result.rows.length);
      var q2 = "UPDATE parameters SET value = "+req.body[req.body.length-1]+" where parmid="+parmid+";";
      client.query(q2, function(err, result2){
        if(err) {
          return console.error('error running query', err);
        }
        parameter.value = req.body[req.body.length-1];
        res.json(parameter);
        client.end();
      });
    });
  });
};






exports.getOrderedPointValuesOfParameter = function(req, res){
  console.log('API call: getOrderedPointValuesOfParameter');
  var pid = req.params.pid;
  var iid = req.params.iid;
  var parmid = req.params.parmid;
  var uid = req.session.passport.user;

  var pointValues = [];
  var pointCoords = [];

  console.log(pid + " " + parmid);


  var toRet = {};

  


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // var q = "SELECT * FROM indicators WHERE pid_proj = "+pid+" and pointid_point = "+pointid+";";
    // var q = "select pointid_point as pointid, x, y, parameters.value from parameters, indicators, points where iid_ind = iid and indicators.pointid_point = points.pointid and indicators.pid_proj = "+pid+" and pointid_point is not null and parameters.title = (select title from parameters where parmid="+parmid+");";
    var q = "select pointid_point as pointid, x, y, parameters.value from parameters, indicators, points where iid_ind = iid and indicators.pointid_point = points.pointid and indicators.pid_proj = "+pid+" and pointid_point is not null and parameters.title = (select title from parameters where parmid="+parmid+") and indicators.pid_proj in (select pid_proj from users_projects where uid_user = "+uid+");";
    // NA QUERY TB QUEREMOS EVITAR OS QUE TÊM POINTID!

    client.query(q, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);

      for(var i = 0; i < result.rows.length; i++){
        var row = result.rows[i];
        // console.log(row);
        var locToAdd = row;
        pointCoords.push(locToAdd);

        pointValues.push([ row.pointid, row.value ]);
      }

      pointValues.sort(function(a,b) {
        return parseInt(b) - parseInt(a);
      });

      toRet.locations = pointCoords;
      toRet.ranking = pointValues;


      res.json(toRet);


      client.end();
    });
  });
}


exports.getAlerts = function(req, res){
  console.log('API call: getAlerts');


  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("select parmid, iid, pid_proj as pid, pointid_point as pointid, parameters.title, parameters.value, parameters.min, parameters.max from parameters, indicators where parameters.iid_ind=indicators.iid and (parameters.value::double precision < parameters.min::double precision or parameters.value::double precision > parameters.max::double precision) and parameters.alarm='yes'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log("Number of results: "+result.rows.length);
      console.log(result.rows);
      
      res.json(result.rows);
      // console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

}