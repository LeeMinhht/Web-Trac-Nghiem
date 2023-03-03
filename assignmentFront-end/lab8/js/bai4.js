var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
   $routeProvider.when('/home',{
      templateUrl: 'view/exercise2/index.html'
   })
   .when('/gioithieu',{
      templateUrl: 'view/exercise2/gioiThieu.html'
   })
   .when('/lienhe',{
      templateUrl: 'view/exercise2/lienHe.html'
   })
   .when('/gopy',{
      templateUrl: 'view/exercise2/gopY.html'
   })
   .when('/hoidap',{
      templateUrl: 'view/exercise2/hoiDap.html'
   })
   .when('/monhoc/:id',{
      templateUrl: 'view/exercise2/ProductList.html',
      controller: 'monhocCtrl'
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