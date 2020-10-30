angular.module("projetoCrud").config( function($routeProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');

  $routeProvider.when("/login", {
    templateUrl: "view/login.html",
    controller: "loginCtrl",
  })
  
  $routeProvider.when("/users", {
    templateUrl: "view/usuariosCadastrados.html",
    controller: "usuariosCadastradosCtrl",
    authorize: true
  })

  $routeProvider.otherwise({redirectTo: "/login"});
})