var myApp=angular.module("app",[]);
myApp.service('dataService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function () {
        return $http.get('http://localhost:3000/user');
    }
    this.updateData = function (id, data) {
        return $http.patch('http://localhost:3000/user' + id, data);
    }
    this.postData = function (data) {
        return $http.post('http://localhost:3000/user', data);
    }

});

myApp.controller('dangKiCtrl', function ($scope, $location, $window, dataService, $http) {
    alert("hihi");
    $scope.users = [];

    dataService.getData().then(function(res){
        $scope.users = res.data;
        console.log($scope.users);
    });
   
    $scope.users = null;
    $scope.creatAc =function(){

            var data= {
                id: Math.random(),
                username: $scope.username,
                password: $scope.password,
                fullname :"",
                email: $scope.email,
                gender: "",
                date: ""
            }
            dataService.postData(data).then(function(res){
                alert("Đăng kí thành công");
        
            })
    }   
    
        
    
});