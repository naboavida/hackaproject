'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}






function ProjectsCtrl($scope, $http){
  // $scope.projects = [{id:'0', title:'California', area:'123'},{id:'1', title:'Texas', area:'321'}];
  $http.get('/api/projects').
    success(function(data, status) {
      // console.log("yeah read!");
      // console.log(data);
      $scope.projects = data;
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });



  $scope.form = {};
 
  $scope.submitNewProject = function() {
    // console.log('submitNewProject');
    // console.log($scope.form);
    $http.post('/api/projects', $scope.form).
      success(function(data, status) {
        // console.log("yeah write!" + status);
        // console.log(data);
        $scope.projects = data;
      }).
      error(function (data, status) {
        $scope.data = data || "Request failed";
      });

    // $scope.projects.push($scope.form);
    $scope.form = {};
  }
};

function DashboardCtrl($scope, $http, $routeParams){
  console.log('DashboardCtrl');
  $scope.pid = $routeParams.pid;
  
  $http.get('/api/dashboard/'+$scope.pid).
    success(function(data, status) {
      // console.log("yeah read!");
      // console.log(data);
      $scope.project = data.project;
      $scope.indicators = data.indicators;
      // console.log($scope.indicators);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });


    $scope.submitNewWidget = function() {
      console.log('submitNewWidget');
      $http.post('/api/indicator/'+$scope.pid, $scope.form).
        success(function(data, status) {
          // console.log("yeah write!" + status);
          // console.log(data);
          $scope.indicators = data;
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });

      // $scope.projects.push($scope.form);
      $scope.form = {};
      // fazer o post
      // obter o indicators q este post retorna
    }
  
};


function DashboardPointCtrl($scope, $http, $routeParams){
  console.log('DashboardPointCtrl');
  $scope.pid = $routeParams.pid;
  $scope.pointid = $routeParams.pointid;
  
  $http.get('/api/pointdashboard/'+$scope.pid+"/"+$scope.pointid).
    success(function(data, status) {
      console.log("yeah read!");
      console.log(data);
      $scope.project = data.project;
      $scope.indicators = data.indicators;
      console.log($scope.indicators);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });


    $scope.submitNewWidget = function() {
      console.log('submitNewWidget');
      $http.post('/api/indicator/'+$scope.pid+"/"+$scope.pointid, $scope.form).
        success(function(data, status) {
          console.log("yeah write!" + status);
          console.log(data);

          $scope.indicators = data;
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });

      // $scope.projects.push($scope.form);
      $scope.form = {};
      // fazer o post
      // obter o indicators q este post retorna
    }
  
};



function IndicatorCtrl($scope, $http, $routeParams){
  console.log('IndicatorCtrl');
  $scope.pid = $routeParams.pid;
  $scope.iid = $routeParams.iid;
  $scope.parmid = $routeParams.parmid;
  // console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

  $http.get('/api/indicator/'+$scope.iid).
    success(function(data, status) {
      // console.log("yeah read!");
      // console.log(data);
      // $scope.project = data.title;
      $scope.indicator = data.indicator;
      $scope.parameters = data.parameters;
      // console.log($scope.indicators);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });
};


function IndicatorPointCtrl($scope, $http, $routeParams){
  console.log('IndicatorPointCtrl');
  $scope.pid = $routeParams.pid;
  $scope.pointiid = $routeParams.pointiid;
  $scope.parmid = $routeParams.parmid;
  $scope.pointid = $routeParams.pointid;
  console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

  $http.get('/api/indicator/'+$scope.pointiid+'/'+$scope.pointid).
    success(function(data, status) {
      // console.log("yeah read!");
      // console.log(data);
      // $scope.project = data.title;
      $scope.indicator = data.indicator;
      $scope.parameters = data.parameters;
      // console.log($scope.indicators);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });
};


function ParameterCtrl($scope, $http, $routeParams){
  console.log('ParameterCtrl');
  $scope.pid = $routeParams.pid;
  $scope.iid = $routeParams.iid;
  $scope.parmid = $routeParams.parmid;
  // console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

  $http.get('/api/indicator/'+$scope.iid).
    success(function(data, status) {
      // console.log("yeah read!");
      // console.log(data);
      // $scope.project = data.title;
      $scope.indicator = data.indicator;
      $scope.parameters = data.parameters;
      // console.log($scope.indicators);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });


    if($scope.parmid != undefined){
      // para view get parameter
      $http.get('/api/parameter/'+$scope.iid+'/'+$scope.parmid).
        success(function(data, status) {
          // console.log("yeah read!");
          // console.log(data);
          // $scope.project = data.title;
          $scope.parameter = data;
          // console.log($scope.indicators);
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });
    }
  

  $scope.submitNewParameter = function() {
      // console.log('submitNewParameter');
      $http.post('/api/parameter/'+$scope.pid+'/'+$scope.iid, $scope.form).
        success(function(data, status) {
          // console.log("yeah write!" + status);
          // console.log(data);
          $scope.parameters = data;
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });

      // $scope.projects.push($scope.form);
      $scope.form = {};
      // fazer o post
      // obter o indicators q este post retorna
    }


    // $scope.readingForm = {};

    // $scope.submitNewReading = function(){
    //   console.log('submitNewReading');
    //   console.log($scope.readingForm);

    //   $http.post('/api/parameterReadings/'+$scope.iid+'/'+$scope.parmid, $scope.readingForm).
    //     success(function(data, status) {
    //       console.log("yeah write parameterPointReadings!" + status);
    //       // console.log(data);

    //       $scope.parameter = data;
    //     }).
    //     error(function (data, status) {
    //       $scope.data = data || "Request failed";
    //     });

    //   // $scope.projects.push($scope.form);
    //   $scope.readingForm = {};

    // }


};


function ParameterPointCtrl($scope, $http, $routeParams){
  console.log('ParameterPointCtrl');
  $scope.pid = $routeParams.pid;
  $scope.pointiid = $routeParams.pointiid;
  $scope.pointparmid = $routeParams.pointparmid;
  $scope.pointid = $routeParams.pointid;
  // console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

  $http.get('/api/indicator/'+$scope.pointiid+'/'+$scope.pointid).
    success(function(data, status) {
      console.log("yeah read!");
      // console.log(data);
      // $scope.project = data.title;
      $scope.indicator = data.indicator;
      $scope.parameters = data.parameters;
      console.log($scope.parameters);
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });


    if($scope.pointparmid != undefined){
      // para view get parameter
      // console.log("GOING TO FETCH FOR PointIID and PointParmID: "+'/api/parameter/'+$scope.pointiid+'/'+$scope.pointparmid);
      $http.get('/api/parameterPoint/'+$scope.pointiid+'/'+$scope.pointparmid).
        success(function(data, status) {
          // console.log("yeah read!");
          // console.log(data);
          // $scope.project = data.title;
          $scope.parameter = data;
          // console.log($scope.indicators);
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });
    }
  

  $scope.submitNewParameter = function() {
      // console.log('submitNewParameter');
      $http.post('/api/parameter/'+$scope.pid+'/'+$scope.pointiid+'/'+$scope.pointid, $scope.form).
        success(function(data, status) {
          // console.log("yeah write!" + status);
          // console.log(data);
          $scope.parameters = data;
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });

      // $scope.projects.push($scope.form);
      $scope.form = {};
      // fazer o post
      // obter o indicators q este post retorna
    }

    $scope.readingForm = {};

    $scope.submitNewPointReading = function(){
      console.log('submitNewPointReading');
      console.log($scope.readingForm);

      $http.post('/api/parameterPointReadings/'+$scope.pointiid+'/'+$scope.pointparmid, $scope.readingForm).
        success(function(data, status) {
          console.log("yeah write parameterPointReadings!" + status);
          // console.log(data);

          $scope.parameter = data;
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });

      // $scope.projects.push($scope.form);
      $scope.readingForm = {};

    }


};




function ExampleCtrl($scope, $http, $routeParams){
  console.log("ExampleCtrl");
  var pid = $routeParams.pid;
  var iid = $routeParams.iid;
  var parmid = $routeParams.parmid;


  // isto tb vai ser importante para o outro grafico
  $scope.xAxisTickFormatFunction = function(){
      return function(d){
          return d3.time.format('%b')(new Date(d));
      }
  }


  var colorCategory = d3.scale.category20b();
  $scope.colorFunction = function() {
      return function(d, i) {
          return colorCategory(i);
      };
  }

  

    // // para isto, é preciso colocar o xAxisTickFormat="xAxisTickFormatFunction()" na tag  
    // $scope.exampleDataRanking = [
    // {
    // "key": "Series 1",
    // "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
    // }
    // ];

    // [ [ pointid, value]* ]
    $scope.exampleDataRanking = [
    {
    "key": "Series 1",
    "values": [ [ 3 , 88] , [ 8 , 55] , [ 2 , 30] , [ 5 , 20] , [ 10 , 19] , [ 9 , 18]  ]
    }
    ];

    $http.get('/api/orderedPointValuesOfParameter/'+pid+'/'+iid+'/'+parmid).
      success(function(data, status){
        console.log("read ordered pointvalues");
        console.log(data);
        $scope.exampleDataRanking = [
          {
          "key": "Series 1",
          "values": data.ranking
          }
          ];
      }).
      error(function(data, status){});


    // $scope.exampleDataRanking = [{
    //   "key": ""
    // }];

  // $scope.exampleData = [
  //   {
  //       "key": "History",
  //       "values": []
  //   }];

  // $http.get('/api/parameterReadings/'+iid+'/'+parmid).
  //   success(function(data, status) {
  //     // console.log("yeah read readings!");
  //     $scope.exampleData = [
  //       {
  //           "key": "History",
  //           "values": data
  //       }];
  //   }).
  //   error(function (data, status) {
  //     $scope.data = data || "Request failed";
  //   });
}


function ExamplePointCtrl($scope, $http, $routeParams){
  console.log("ExampleCtrl");
  var pointiid = $routeParams.pointiid;
  var pointparmid = $routeParams.pointparmid;

  // :pid/:pointiid/:pointparmid/:pointid

  $scope.exampleData = [
    {
        "key": "History",
        "values": []
    }];

  $http.get('/api/parameterPointReadings/'+pointiid+'/'+pointparmid).
    success(function(data, status) {
      // console.log("yeah read readings!");
      $scope.exampleData = [
        {
            "key": "History",
            "values": data
        }];
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });


    



}



function BulletCtrl($scope) {
  $scope.bulletData = {
    "ranges": [1, 180, 300],
    "measures": [70],
    "markers": [100]
  };

  $scope.bulletDataRead = {
    "ranges": [1, 3, 5],
    "measures": [3.5],
    "markers": [4.7]
  };

}

function DemoController($scope, $http, $routeParams, $location){
  console.log("DemoController!!!");
  $scope.pid = $routeParams.pid;
  $scope.pointid = $routeParams.pointid;

  console.log($scope);

  // leafletData.getMap().then(function(map) {
  //     // map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);

  //     if($scope.pointid != null && $scope.pointid != undefined){
  //       console.log("center on point");
  //       map.setView([32.666667,-16.75], 9);
  //     } else {
  //       // center on madeira ----- this is hardcoded!!!!!
  //       console.log("center on map center");
  //       map.setView([32.666667,-16.85], 4);
  //     }
  // });

  

  $scope.addPointMode = false;

  angular.extend($scope, {
      london: {
          lat: 51.505,
          lng: -0.09,
          zoom: 4
      },
      madeira: {
          lat: 32.666667,
          lng: -16.75,
          zoom: 9
      },
      events: {}
  });

  $scope.markers = new Array();

  // add markers - for now - only when addPoint mode is activated (dashboards)
  $scope.$on("leafletDirectiveMap.click", function(event, args){
      var leafEvent = args.leafletEvent;
      if($scope.addPointMode){
        // $scope.markers.push({
        //     lat: leafEvent.latlng.lat,
        //     lng: leafEvent.latlng.lng,
        //     message: "My Added Marker"
        // });
        var point = leafEvent.latlng;
        console.log("point");
        console.log(point);
        $http.post('/geoapi/addPoint/'+$scope.pid, point).
          success(function(data) {
            console.log("yeah postPoint added!");
            // $location.path('/projects');
            console.log(data);
            $scope.markers.push({
              lat: data.coord[0].x,
              lng: data.coord[0].y,
              pointid: data.pointid,
              message: "added"
            });
          });
      }
  });


  $scope.$on('leafletDirectiveMarker.click', function(e, args) {
      // Args will contain the marker name and other relevant information
      console.log("Leaflet Click");
      console.log(args);
      console.log($scope.markers[args.markerName].pointid);
      // agora é ir ao /dashboard/:pid/:pointid e ele faz o render do dashboard para o projectid e pointid
      // console.log("/dashboardPoint/"+$scope.pid+"/"+$scope.markers[args.markerName].pointid);
      $location.path( "/dashboard/"+$scope.pid+"/"+$scope.markers[args.markerName].pointid );
  });

  var get_url = '/geoapi/'+$scope.pid;
  if($scope.pointid != null || $scope.pointid != undefined)
    get_url = '/geoapi/'+$scope.pid+'/'+$scope.pointid;

  $http.get(get_url).
    success(function(data, status) {
      console.log("yeah read geoapi!");
      console.log(data);
      // $scope.project = data.title;
      // $scope.parameter = data;
      // console.log($scope.indicators);
      for(var d in data){
        // console.log(data[d]);
        $scope.markers.push({
          lat: data[d].x,
          lng: data[d].y,
          pointid: data[d].pointid,
          message: "added"
        });
      }
      
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });

    

    $scope.addPoint = function(){
      console.log("addPoint");
      if(!$scope.addPointMode){
        $scope.addPointMode = true;
      } else {
        $scope.addPointMode = false;
      }
        
    };
}




function DemoOrderedPointsController($scope, $http, $routeParams, $location){
  console.log("DemoOrderedPointsController!!!");
  $scope.pid = $routeParams.pid;
  $scope.iid = $routeParams.iid;
  $scope.pointid = $routeParams.pointid;

  // console.log($scope);

  // leafletData.getMap().then(function(map) {
  //     // map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);

  //     if($scope.pointid != null && $scope.pointid != undefined){
  //       console.log("center on point");
  //       map.setView([32.666667,-16.75], 9);
  //     } else {
  //       // center on madeira ----- this is hardcoded!!!!!
  //       console.log("center on map center");
  //       map.setView([32.666667,-16.85], 4);
  //     }
  // });

  

  $scope.addPointMode = false;

  angular.extend($scope, {
      london: {
          lat: 51.505,
          lng: -0.09,
          zoom: 4
      },
      madeira: {
          lat: 32.666667,
          lng: -16.75,
          zoom: 9
      },
      events: {}
  });

  $scope.markers = new Array();



  $scope.$on('leafletDirectiveMarker.click', function(e, args) {
      // Args will contain the marker name and other relevant information
      console.log("Leaflet Click");
      console.log(args);
      console.log($scope.markers[args.markerName].pointid);
      // agora é ir ao /dashboard/:pid/:pointid e ele faz o render do dashboard para o projectid e pointid
      // console.log("/dashboardPoint/"+$scope.pid+"/"+$scope.markers[args.markerName].pointid);
      $location.path( "/dashboard/"+$scope.pid+"/"+$scope.markers[args.markerName].pointid );
  });



  $http.get('/api/orderedPointValuesOfParameter/'+$scope.pid+'/'+$scope.iid+'/'+$scope.parmid).
      success(function(data, status){
        console.log("read ordered pointlocations");
        console.log(data.locations);
        $scope.markers = new Array();
        
        for(var d in data.locations){
            // console.log(data[d]);
            $scope.markers.push({
              lat: data.locations[d].x,
              lng: data.locations[d].y,
              pointid: data.locations[d].pointid,
              message: "added"
            });
          }
      }).
      error(function(data, status){});

}





var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];


function CalendarCtrl($scope, $http, $routeParams){
  console.log("CalendarCtrl!!!");
  $scope.pid = $routeParams.pid;

  $scope.nextActivity = {};

  $scope.addForm = 'display-none';
  $scope.viewForm = 'display-none';
  

  $http.get('/api/activities/'+$scope.pid).
    success(function(data) {
      // console.log("data is ");
      // console.log(data);
      
      for(var i = 0; i < data.length; i++){
        var aux_obj = {};
        aux_obj.title = data[i].title;
        aux_obj.start = new Date(data[i].start);
        aux_obj.aid = data[i].aid;
        aux_obj.allDay = data[i].allDay;
        aux_obj.responsible = data[i].responsible;

        // console.log(aux_obj);
        $scope.events.push(aux_obj);

        var date_next = new Date($scope.nextActivity.start);
        var date_aux = new Date(aux_obj.start);
        var today = new Date();
        // today.setHours(myDate.getDate()-1);

        console.log("Comparing aux < next "+ (date_aux < date_next) );
        if($scope.nextActivity.start == undefined || $scope.nextActivity.start == null || ( date_aux < date_next) ){
          // end a null, compara só o dia inclusive
          //else
          console.log("Comparing today!");
          // console.log("today: " + today + " -- aux_date "+date_aux);
          if(aux_obj.allDay)
            today.setHours(0,0,0,0);
          console.log("today: " + today + " -- aux_date "+date_aux);
          if(date_aux >= today)
            $scope.nextActivity = aux_obj;

        }

        
      }

      $scope.nextActivity.day = new Date($scope.nextActivity.start).getDate();
      $scope.nextActivity.month = monthNames[new Date($scope.nextActivity.start).getMonth()];
      $scope.nextActivity.year = new Date($scope.nextActivity.start).getFullYear();

      // $scope.events[0].title = data[0].title;
      // $scope.nextActivity = data.nextActivity;
      // $scope.nextStart = data.nextStart;
      // $scope.events[0].start = $scope.nextStart;
    });


    $scope.nextActivity = {
      name: 'Water Sampling',
      day: '28',
      month: 'May',
      year: '2014'
    };

    // read from api
    // $http.get('/api/nextActivity/').
    //   success(function(data) {
    //     // console.log("data is ");
    //     // console.log(data.nextActivity);
    //     $scope.nextActivity = data.nextActivity;
    //     $scope.nextStart = data.nextStart;
    //     // console.log("NEXT ACTIVITYYYYYYYY:");
    //     // console.log($scope.nextStart);
    //     // console.log($scope.events[0].start);
    //     $scope.events[0].start = $scope.nextStart;
    //   });
  

  $scope.alertOnDrop = function(elem){
    var dateDropped = new Date(elem.start);
    console.log(elem);
    // console.log(dateDropped.getDate());
    var togo = {'aid':elem.aid, 'title':elem.title, 'start':elem.start, 'end':elem.end, 'allDay':elem.allDay};
    $http.post('/api/activities/'+$scope.pid, togo).
      success(function(data) {
        // console.log("yeah postNextActivity!");
        // $location.path('/projects');
      });
  };
  
  $scope.alertDayClick = function(date, allDay, jsEvent, view){
    $scope.addForm = '';
    $scope.viewForm = 'display-none';

    $scope.calEventsExt.events = [];
    if (allDay) {
        // console.log('Clicked on the entire day: ' + date);
    }else{
        // console.log('Clicked on the slot: ' + date);
    }
    $scope.toAdd.title = '<empty name>';
    $scope.toAdd.start = date;
    if(allDay)
      $scope.toAdd.end = null;
    $scope.toAdd.allDay = allDay;
    // console.log("to add start "+$scope.toAdd.start);
    // $scope.eventsToAdd.push({title:$scope.toAdd.title, start:$scope.toAdd.start});
    $scope.calEventsExt.events.push({title:$scope.toAdd.title, start:$scope.toAdd.start, "allDay":allDay});
    // console.log($scope.events);
  };

  $scope.toAdd = {};

  $scope.addActivity = function(){
    $scope.addForm = 'display-none';
    $scope.viewForm = 'display-none';
    $scope.calEventsExt.events = [];
    // $scope.events.push(toAdd);
    // falta adicionar à API
    console.log("sneding scope toadd");
    console.log($scope.toAdd);
    $http.post('/api/activities/'+$scope.pid, $scope.toAdd).
      success(function(data) {
        // console.log("yeah postNextActivity!");
        // $location.path('/projects');
        // $.each(function(data, i) {
          data.start = new Date(data.start);
        // });

        $scope.events.push(data);
        // console.log("received start date "+data.start);
        // console.log("translated date "+ (new Date(data.start)) );
        $scope.toAdd = {};
      });
  }

  $scope.alertEventClick = function( eventCell, jsEvent, view ) {
    console.log('alertEventClick');
    $scope.addForm = 'display-none';
    $scope.viewForm = '';

    // console.log("eventCell");
    // console.log(eventCell);

    $scope.toAdd.title = eventCell.title;
    $scope.toAdd.start = eventCell.start;
    $scope.toAdd.end = eventCell.end;
    $scope.toAdd.allDay = eventCell.allDay;
    $scope.toAdd.location = eventCell.location;
    $scope.toAdd.responsible = eventCell.responsible; // isto tem de vir do events, que veio da BD
    $scope.calEventsExt.events = [];
  };


  $scope.activityToAdd = '';

  $scope.uiConfig = {
    calendar: {
      height: 400,
      editable: true,
      header: {
        // left: 'month basicWeek basicDay agendaWeek agendaDay',
        left: 'agendaDay agendaWeek month',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.alertDayClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventClick: $scope.alertEventClick
    }
  };



  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  
  // $scope.events = [
  //   { title: 'Water Sampling', start: new Date(y, m, 28) }, { title: 'Water 2', start: new Date(y, m, 29) }
  // ];
  $scope.events = [];
  $scope.eventsToAdd = [];
  console.log("1 events:");
  console.log($scope.events);

  $scope.calEventsExt = {
       color: '#aa0',
       // textColor: 'yellow',
       events: []
    };

  $scope.eventSources = [$scope.events, $scope.calEventsExt];
}