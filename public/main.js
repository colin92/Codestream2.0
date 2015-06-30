'use strict';

var app = angular.module('Meaniscule', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
'use strict';

app.factory('Auth', function ($http) {

  var user = null;

  return {
    getUser: function getUser() {
      return user;
    },
    loggedIn: function loggedIn() {
      return !!user;
    },
    login: function login() {
      return $http.get('/login').then(function (res) {
        return res.data;
      });
    },
    logout: function logout() {
      return $http.get('/logout').then(function (res) {
        user = null;
      });
    }
  };
});
'use strict';

app.factory('Project', function ($http) {
  return {};
});
"use strict";

app.controller("HomeController", function ($scope, $http) {

  $scope.msgFromScope = "...And I'm a message from the HomeController scope, just so you know that I work!";
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/app/home/home.html',
        controller: 'HomeController'
    });
});
'use strict';

app.controller('ModulesController', function ($scope, $http, ModulesFactory) {

  $scope.$on('$stateChangeSuccess', function () {
    var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

    ModulesFactory.getNodeModules().then(function (modules) {
      $scope.nodeModules = modules;

      if (!$scope.nodeModules.length) {
        $scope.defaultMessage = defaultMessage;
      }
    });
  });
});
'use strict';

app.factory('ModulesFactory', function ($http) {
  return {
    getNodeModules: function getNodeModules() {
      return $http.get('/api/modules/').then(function (res) {
        return res.data;
      });
    }
  };
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/app/modules/modules.html',
        controller: 'ModulesController'
    });
});
"use strict";

app.directive("navbar", function () {
	return {
		restrict: "E",
		templateUrl: "/app/navbar/navbar.html"
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9hdXRoLmZhY3RvcnkuanMiLCJmYWN0b3JpZXMvcHJvamVjdC5mYWN0b3J5LmpzIiwiaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiLCJob21lL2hvbWUuc3RhdGUuanMiLCJtb2R1bGVzL21vZHVsZXMuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvbW9kdWxlcy5mYWN0b3J5LmpzIiwibW9kdWxlcy9tb2R1bGVzLnN0YXRlLmpzIiwibmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O0FBRXRELEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRTs7QUFFekQsb0JBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVsQyxxQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEMsQ0FBQyxDQUFDO0FDUEgsWUFBWSxDQUFDOztBQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsS0FBSyxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLFNBQU87QUFDTCxXQUFPLEVBQUUsbUJBQVc7QUFDbEIsYUFBTyxJQUFJLENBQUM7S0FDYjtBQUNELFlBQVEsRUFBRSxvQkFBVztBQUNuQixhQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDZjtBQUNELFNBQUssRUFBRSxpQkFBVztBQUNoQixhQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQzVDLGVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQztPQUNqQixDQUFDLENBQUM7S0FDSjtBQUNELFVBQU0sRUFBRSxrQkFBVztBQUNqQixhQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQzdDLFlBQUksR0FBRyxJQUFJLENBQUM7T0FDYixDQUFDLENBQUM7S0FDSjtHQUNGLENBQUM7Q0FDSCxDQUFDLENBQUM7QUN4QkgsWUFBWSxDQUFDOztBQUViLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQ3JDLFNBQU8sRUFFTixDQUFDO0NBQ0gsQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFFdkQsUUFBTSxDQUFDLFlBQVksR0FBRyxtRkFBbUYsQ0FBQztDQUUzRyxDQUFDLENBQUM7OztBQ0pILEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxjQUFjLEVBQUU7QUFDakMsa0JBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFdBQUcsRUFBRSxHQUFHO0FBQ1IsbUJBQVcsRUFBRSxxQkFBcUI7QUFDbEMsa0JBQVUsRUFBRSxnQkFBZ0I7S0FDL0IsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7O0FBRTFFLFFBQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUM1QyxRQUFJLGNBQWMsR0FBRywwS0FBMEssQ0FBQzs7QUFFaE0sa0JBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FDNUIsSUFBSSxDQUFDLFVBQVMsT0FBTyxFQUFFO0FBQ3RCLFlBQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDOztBQUU3QixVQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7QUFDOUIsY0FBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7T0FDeEM7S0FDRixDQUFDLENBQUM7R0FDTixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUM7OztBQ2RILEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDNUMsU0FBTztBQUNMLGtCQUFjLEVBQUUsMEJBQVc7QUFDekIsYUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUM5QixJQUFJLENBQUMsVUFBUyxHQUFHLEVBQUU7QUFDbEIsZUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDO09BQ2pCLENBQUMsQ0FBQztLQUNOO0dBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQzs7O0FDVEgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLGNBQWMsRUFBRTtBQUNqQyxrQkFBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDNUIsV0FBRyxFQUFFLFVBQVU7QUFDZixtQkFBVyxFQUFFLDJCQUEyQjtBQUN4QyxrQkFBVSxFQUFFLG1CQUFtQjtLQUNsQyxDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7OztBQ05ILEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVU7QUFDakMsUUFBTztBQUNOLFVBQVEsRUFBRSxHQUFHO0FBQ2IsYUFBVyxFQUFFLHlCQUF5QjtFQUN0QyxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ01lYW5pc2N1bGUnLCBbJ3VpLnJvdXRlciddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmFwcC5mYWN0b3J5KCdBdXRoJywgZnVuY3Rpb24oJGh0dHApIHtcblxuICB2YXIgdXNlciA9IG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRVc2VyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB1c2VyOyBcbiAgICB9LFxuICAgIGxvZ2dlZEluOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhIXVzZXI7IFxuICAgIH0sXG4gICAgbG9naW46IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ2luJykudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhOyBcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbG9nb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB1c2VyID0gbnVsbDtcbiAgICAgIH0pOyBcbiAgICB9XG4gIH07ICBcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuZmFjdG9yeSgnUHJvamVjdCcsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgXG4gIH07ICBcbn0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICBcbiAgJHNjb3BlLm1zZ0Zyb21TY29wZSA9IFwiLi4uQW5kIEknbSBhIG1lc3NhZ2UgZnJvbSB0aGUgSG9tZUNvbnRyb2xsZXIgc2NvcGUsIGp1c3Qgc28geW91IGtub3cgdGhhdCBJIHdvcmshXCI7XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuY29udHJvbGxlcignTW9kdWxlc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBNb2R1bGVzRmFjdG9yeSkge1xuICBcbiAgJHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVmYXVsdE1lc3NhZ2UgPSAnSWYgeW91IGRvblxcJ3Qgc2VlIGEgbGlzdCBvZiBsaW5rcyBoZXJlLCB5b3UgbmVlZCB0byBzZWVkIHlvdXIgZGF0YWJhc2UhXFxuSW4geW91ciB0ZXJtaW5hbCwgZ28gdG8gdGhpcyBhcHBcXCdzIGRpcmVjdG9yeSBhbmQgcnVuIGBndWxwIHNlZWREQmAuXFxuVGhlbiB0cnkgdGhpcyBwYWdlIGFnYWluLic7XG5cbiAgICBNb2R1bGVzRmFjdG9yeS5nZXROb2RlTW9kdWxlcygpXG4gICAgICAudGhlbihmdW5jdGlvbihtb2R1bGVzKSB7XG4gICAgICAgICRzY29wZS5ub2RlTW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgICAgIFxuICAgICAgICBpZiAoISRzY29wZS5ub2RlTW9kdWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAkc2NvcGUuZGVmYXVsdE1lc3NhZ2UgPSBkZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xufSk7IiwiYXBwLmZhY3RvcnkoJ01vZHVsZXNGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuIHtcbiAgICBnZXROb2RlTW9kdWxlczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21vZHVsZXMvJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICB9KTsgICAgXG4gICAgfVxuICB9O1xufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbW9kdWxlcycsIHtcbiAgICAgICAgdXJsOiAnL21vZHVsZXMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvbW9kdWxlcy9tb2R1bGVzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTW9kdWxlc0NvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwibmF2YmFyXCIsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6IFwiRVwiLFxuXHRcdHRlbXBsYXRlVXJsOiBcIi9hcHAvbmF2YmFyL25hdmJhci5odG1sXCJcblx0fTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==