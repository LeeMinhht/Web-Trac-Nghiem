var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
   $routeProvider.when('/home',{
      templateUrl: 'view/exercise1/home.html'
   })
   .when('/about',{
      templateUrl: 'view/exercise1/about.html'
   })
   .when('/contact',{
      templateUrl: 'view/exercise1/contact.html'
   })
   .otherwise({
      redirectTo: '/home'
   });
});
myApp.controller("bonusCtrl", function($scope){ 
   $scope.products = list;
});
myApp.run(function($rootScope){
   $rootScope.$on("$routeChangeStart", function(){
      $rootScope.loading = true;
   })
   $rootScope.$on("$routeChangeSuccess", function(){
      $rootScope.loading = false;
   })
   $rootScope.$on("$routeChangeError", function(){
      $rootScope.loading = false;
      alert('Lỗi không tải được template');
   })
})