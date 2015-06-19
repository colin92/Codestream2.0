'use strict';

var app = angular.module('Meaniscule', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
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
"use strict";

app.directive("navbar", function () {
	return {
		restrict: "E",
		templateUrl: "/app/navbar/navbar.html"
	};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCJtb2R1bGVzL21vZHVsZXMuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvbW9kdWxlcy5mYWN0b3J5LmpzIiwibW9kdWxlcy9tb2R1bGVzLnN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7O0FBRXpELG9CQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEMscUJBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQzs7O0FDUEgsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRXZELFFBQU0sQ0FBQyxZQUFZLEdBQUcsbUZBQW1GLENBQUM7Q0FFM0csQ0FBQyxDQUFDOzs7QUNKSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsY0FBYyxFQUFFO0FBQ2pDLGtCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFXLEVBQUUscUJBQXFCO0FBQ2xDLGtCQUFVLEVBQUUsZ0JBQWdCO0tBQy9CLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7O0FDTkgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBVTtBQUNqQyxRQUFPO0FBQ04sVUFBUSxFQUFFLEdBQUc7QUFDYixhQUFXLEVBQUUseUJBQXlCO0VBQ3RDLENBQUM7Q0FDRixDQUFDLENBQUM7OztBQ0xILEdBQUcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTs7QUFFMUUsUUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZO0FBQzVDLFFBQUksY0FBYyxHQUFHLDBLQUEwSyxDQUFDOztBQUVoTSxrQkFBYyxDQUFDLGNBQWMsRUFBRSxDQUM1QixJQUFJLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDdEIsWUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtBQUM5QixjQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztPQUN4QztLQUNGLENBQUMsQ0FBQztHQUNOLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQzs7O0FDZEgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLEtBQUssRUFBRTtBQUM1QyxTQUFPO0FBQ0wsa0JBQWMsRUFBRSwwQkFBVztBQUN6QixhQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQzlCLElBQUksQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUNsQixlQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7T0FDakIsQ0FBQyxDQUFDO0tBQ047R0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDOzs7QUNUSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsY0FBYyxFQUFFO0FBQ2pDLGtCQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUM1QixXQUFHLEVBQUUsVUFBVTtBQUNmLG1CQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGtCQUFVLEVBQUUsbUJBQW1CO0tBQ2xDLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdNZWFuaXNjdWxlJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgIC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcbiAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICBcbiAgJHNjb3BlLm1zZ0Zyb21TY29wZSA9IFwiLi4uQW5kIEknbSBhIG1lc3NhZ2UgZnJvbSB0aGUgSG9tZUNvbnRyb2xsZXIgc2NvcGUsIGp1c3Qgc28geW91IGtub3cgdGhhdCBJIHdvcmshXCI7XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwibmF2YmFyXCIsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6IFwiRVwiLFxuXHRcdHRlbXBsYXRlVXJsOiBcIi9hcHAvbmF2YmFyL25hdmJhci5odG1sXCJcblx0fTtcbn0pOyIsImFwcC5jb250cm9sbGVyKCdNb2R1bGVzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIE1vZHVsZXNGYWN0b3J5KSB7XG4gIFxuICAkc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBkZWZhdWx0TWVzc2FnZSA9ICdJZiB5b3UgZG9uXFwndCBzZWUgYSBsaXN0IG9mIGxpbmtzIGhlcmUsIHlvdSBuZWVkIHRvIHNlZWQgeW91ciBkYXRhYmFzZSFcXG5JbiB5b3VyIHRlcm1pbmFsLCBnbyB0byB0aGlzIGFwcFxcJ3MgZGlyZWN0b3J5IGFuZCBydW4gYGd1bHAgc2VlZERCYC5cXG5UaGVuIHRyeSB0aGlzIHBhZ2UgYWdhaW4uJztcblxuICAgIE1vZHVsZXNGYWN0b3J5LmdldE5vZGVNb2R1bGVzKClcbiAgICAgIC50aGVuKGZ1bmN0aW9uKG1vZHVsZXMpIHtcbiAgICAgICAgJHNjb3BlLm5vZGVNb2R1bGVzID0gbW9kdWxlcztcbiAgICAgICAgXG4gICAgICAgIGlmICghJHNjb3BlLm5vZGVNb2R1bGVzLmxlbmd0aCkge1xuICAgICAgICAgICRzY29wZS5kZWZhdWx0TWVzc2FnZSA9IGRlZmF1bHRNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG59KTsiLCJhcHAuZmFjdG9yeSgnTW9kdWxlc0ZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldE5vZGVNb2R1bGVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvbW9kdWxlcy8nKVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgIH0pOyAgICBcbiAgICB9XG4gIH07XG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtb2R1bGVzJywge1xuICAgICAgICB1cmw6ICcvbW9kdWxlcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC9tb2R1bGVzL21vZHVsZXMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdNb2R1bGVzQ29udHJvbGxlcidcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==