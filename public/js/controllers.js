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
      $scope.project = data.title;
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