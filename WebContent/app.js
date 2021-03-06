var app = angular.module("myApp", ["ngRoute","ngCookies","registerApp","blogApp"])
.run(run);
app.config(function($routeProvider,$locationProvider) {
	
    $routeProvider
    .when("/home", {
        templateUrl : "Home.html",
        controller:'LoginController',
    	controllerAs:'vm'
    })
    .when("/blog", {
        templateUrl : "Blog/blog.html",
        controller :'blogcntrl'
       
    })
    .when("/forum", {
        templateUrl : "Forum/Forum.html",
        controller :  'forumctrl'
   
    })
    .when("/register",{
    	templateUrl: "Register/Register.html",
    	controller: "userctrl"
    })
    .when("/Userprofile",{
    	templateUrl: "Register/Userprofile.html",
    	controller: "userctrl"
    })
    
    .when("/login",{
    	templateUrl:"Login/Login.html",
    	controller:'LoginController',
    	controllerAs:'vm'
    })
    .when("/users",{
    	templateUrl: "Friend/AllUsers.html",
    	controller:'alluserctrl'
    })
    .when("/chat",{
    	templateUrl: "Chat/chat.html",
    	controller: "chatController",
    })
    .when("/job",{
    	templateUrl: "Job/viewjob.html",
    	controller: "jobctrl"
    })
    .when("/job",{
    	templateUrl: "Job/createjob.html",
    	controller: "jobctrl"
    })
    
    .when("/myfriends",{
    	templateUrl: "Friend/MyFriends.html",
    	controller: "myfriendctrl"
    })
    .when("/newrequests",{
    	templateUrl: "Friend/newrequests.html",
    	controller: "myfriendctrl"
    })		
    .when("/individualforum",{
    	templateUrl: "Forum/IndividualForum.html",
	controller: "commentctrl"
    });
    console.log("route");    });
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
  
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/jobs']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}