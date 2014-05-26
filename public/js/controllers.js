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
    console.log('submitNewProject');
    console.log($scope.form);
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
  console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

  $http.get('/api/indicator/'+$scope.iid).
    success(function(data, status) {
      console.log("yeah read!");
      console.log(data);
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
  console.log('pid: '+$scope.pid + ' iid: ' + $scope.iid + ' parmid: '+$scope.parmid);

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
          console.log("yeah read!");
          console.log(data);
          // $scope.project = data.title;
          $scope.parameter = data;
          // console.log($scope.indicators);
        }).
        error(function (data, status) {
          $scope.data = data || "Request failed";
        });
    }
  

  $scope.submitNewParameter = function() {
      console.log('submitNewParameter');
      $http.post('/api/parameter/'+$scope.pid+'/'+$scope.iid, $scope.form).
        success(function(data, status) {
          // console.log("yeah write!" + status);
          console.log(data);
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
};


function ExampleCtrl($scope){
    $scope.exampleData = [
        {
            "key": "Series 1",
            "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] , [ 1059624000000 , 11.341210982529] , [ 1062302400000 , 14.734820409020] , [ 1064894400000 , 12.387148007542] , [ 1067576400000 , 18.436471461827] , [ 1070168400000 , 19.830742266977] , [ 1072846800000 , 22.643205829887] , [ 1075525200000 , 26.743156781239] , [ 1078030800000 , 29.597478802228] , [ 1080709200000 , 30.831697585341] , [ 1083297600000 , 28.054068024708] , [ 1085976000000 , 29.294079423832] , [ 1088568000000 , 30.269264061274] , [ 1091246400000 , 24.934526898906] , [ 1093924800000 , 24.265982759406] , [ 1096516800000 , 27.217794897473] , [ 1099195200000 , 30.802601992077] , [ 1101790800000 , 36.331003758254] , [ 1104469200000 , 43.142498700060] , [ 1107147600000 , 40.558263931958] , [ 1109566800000 , 42.543622385800] , [ 1112245200000 , 41.683584710331] , [ 1114833600000 , 36.375367302328] , [ 1117512000000 , 40.719688980730] , [ 1120104000000 , 43.897963036919] , [ 1122782400000 , 49.797033975368] , [ 1125460800000 , 47.085993935989] , [ 1128052800000 , 46.601972859745] , [ 1130734800000 , 41.567784572762] , [ 1133326800000 , 47.296923737245] , [ 1136005200000 , 47.642969612080] , [ 1138683600000 , 50.781515820954] , [ 1141102800000 , 52.600229204305] , [ 1143781200000 , 55.599684490628] , [ 1146369600000 , 57.920388436633] , [ 1149048000000 , 53.503593218971] , [ 1151640000000 , 53.522973979964] , [ 1154318400000 , 49.846822298548] , [ 1156996800000 , 54.721341614650] , [ 1159588800000 , 58.186236223191] , [ 1162270800000 , 63.908065540997] , [ 1164862800000 , 69.767285129367] , [ 1167541200000 , 72.534013373592] , [ 1170219600000 , 77.991819436573] , [ 1172638800000 , 78.143584404990] , [ 1175313600000 , 83.702398665233] , [ 1177905600000 , 91.140859312418] , [ 1180584000000 , 98.590960607028] , [ 1183176000000 , 96.245634754228] , [ 1185854400000 , 92.326364432615] , [ 1188532800000 , 97.068765332230] , [ 1191124800000 , 105.81025556260] , [ 1193803200000 , 114.38348777791] , [ 1196398800000 , 103.59604949810] , [ 1199077200000 , 101.72488429307] , [ 1201755600000 , 89.840147735028] , [ 1204261200000 , 86.963597532664] , [ 1206936000000 , 84.075505208491] , [ 1209528000000 , 93.170105645831] , [ 1212206400000 , 103.62838083121] , [ 1214798400000 , 87.458241365091] , [ 1217476800000 , 85.808374141319] , [ 1220155200000 , 93.158054469193] , [ 1222747200000 , 65.973252382360] , [ 1225425600000 , 44.580686638224] , [ 1228021200000 , 36.418977140128] , [ 1230699600000 , 38.727678144761] , [ 1233378000000 , 36.692674173387] , [ 1235797200000 , 30.033022809480] , [ 1238472000000 , 36.707532162718] , [ 1241064000000 , 52.191457688389] , [ 1243742400000 , 56.357883979735] , [ 1246334400000 , 57.629002180305] , [ 1249012800000 , 66.650985790166] , [ 1251691200000 , 70.839243432186] , [ 1254283200000 , 78.731998491499] , [ 1256961600000 , 72.375528540349] , [ 1259557200000 , 81.738387881630] , [ 1262235600000 , 87.539792394232] , [ 1264914000000 , 84.320762662273] , [ 1267333200000 , 90.621278391889] , [ 1270008000000 , 102.47144881651] , [ 1272600000000 , 102.79320353429] , [ 1275278400000 , 90.529736050479] , [ 1277870400000 , 76.580859994531] , [ 1280548800000 , 86.548979376972] , [ 1283227200000 , 81.879653334089] , [ 1285819200000 , 101.72550015956] , [ 1288497600000 , 107.97964852260] , [ 1291093200000 , 106.16240630785] , [ 1293771600000 , 114.84268599533] , [ 1296450000000 , 121.60793322282] , [ 1298869200000 , 133.41437346605] , [ 1301544000000 , 125.46646042904] , [ 1304136000000 , 129.76784954301] , [ 1306814400000 , 128.15798861044] , [ 1309406400000 , 121.92388706072] , [ 1312084800000 , 116.70036100870] , [ 1314763200000 , 88.367701837033] , [ 1317355200000 , 59.159665765725] , [ 1320033600000 , 79.793568139753] , [ 1322629200000 , 75.903834028417] , [ 1325307600000 , 72.704218209157] , [ 1327986000000 , 84.936990804097] , [ 1330491600000 , 93.388148670744]]
        }];

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

function DemoController($scope, $http, $routeParams){
  console.log("DemoController!!!");
  $scope.pid = $routeParams.pid;

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

  // $scope.$on("leafletDirectiveMap.click", function(event, args){
  //     var leafEvent = args.leafletEvent;

  //     $scope.markers.push({
  //         lat: leafEvent.latlng.lat,
  //         lng: leafEvent.latlng.lng,
  //         message: "My Added Marker"
  //     });
  // });

  $http.get('/geoapi/'+$scope.pid).
    success(function(data, status) {
      console.log("yeah read geoapi!");
      console.log(data);
      // $scope.project = data.title;
      // $scope.parameter = data;
      // console.log($scope.indicators);
      for(var d in data){
        console.log(data[d]);
        $scope.markers.push({
          lat: data[d].x,
          lng: data[d].y,
          message: "added"
        });
      }
      
    }).
    error(function (data, status) {
      $scope.data = data || "Request failed";
    });

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
        aux_obj.start = data[i].start;
        aux_obj.aid = data[i].aid;

        console.log(aux_obj);
        $scope.events.push(aux_obj);

        var date_next = new Date($scope.nextActivity.start);
        var date_aux = new Date(aux_obj.start);
        var today = new Date();
        // today.setHours(myDate.getDate()-1);

        if($scope.nextActivity.start == undefined || $scope.nextActivity.start == null || ( date_aux < date_next) ){
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
    console.log(dateDropped);
    // console.log(dateDropped.getDate());
    var togo = {'aid':elem.aid, 'title':elem.title, 'start':elem.start};
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
        console.log('Clicked on the entire day: ' + date);
    }else{
        // console.log('Clicked on the slot: ' + date);
    }
    $scope.toAdd.title = '<empty name>';
    $scope.toAdd.start = date;
    console.log("to add start "+$scope.toAdd.start);
    // $scope.eventsToAdd.push({title:$scope.toAdd.title, start:$scope.toAdd.start});
    $scope.calEventsExt.events.push({title:$scope.toAdd.title, start:$scope.toAdd.start});
    // console.log($scope.events);
  };

  $scope.toAdd = {};

  $scope.addActivity = function(){
    $scope.addForm = 'display-none';
    $scope.viewForm = 'display-none';
    $scope.calEventsExt.events = [];
    // $scope.events.push(toAdd);
    // falta adicionar à API
    console.log("to add start2 "+$scope.toAdd.start);

    $http.post('/api/activities/'+$scope.pid, $scope.toAdd).
      success(function(data) {
        // console.log("yeah postNextActivity!");
        // $location.path('/projects');

        $scope.events.push(data);
        console.log("received start date "+data.start);
        console.log("translated date "+ (new Date(data.start)) );
        $scope.toAdd = {};
      });
  }

  $scope.alertEventClick = function( eventCell, jsEvent, view ) {
    console.log('alertEventClick');
    $scope.addForm = 'display-none';
    $scope.viewForm = '';

    $scope.toAdd.title = eventCell.title;
    $scope.toAdd.start = eventCell.start;
    $scope.toAdd.location = eventCell.location;
    $scope.toAdd.responsible = eventCell.responsible;
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