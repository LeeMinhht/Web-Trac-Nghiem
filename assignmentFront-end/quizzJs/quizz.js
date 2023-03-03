var myApp=angular.module('myApp',['ngRoute']);


myApp.service('dataService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function () {
        return $http.get('http://localhost:3000/user');
    }
    this.updateData = function (id, data) {
        return $http.put('http://localhost:3000/user/' + id, data);
    }
    this.postData = function (data) {
        return $http.post('http://localhost:3000/user', data);
    }
    this.deleteData = function (id){
        return $http.delete('http://localhost:3000/user' + id);
    }

});
// login

myApp.controller('loginCtrl', function ($scope, $location, $window, dataService, $http, $rootScope) {
    $scope.users = [];

    dataService.getData().then(function(res){
        $scope.users = res.data;
        // 
        


    });
   
    $scope.users = null;
    $scope.login = function () {
        var checkUser=true;
        
        for (var i = 0; i < $scope.users.length; i++) {
            if ($scope.fullname != $scope.users[i].username) { 
                 checkUser = false;
                //  alert('Tên đăng nhập không đúng');
            }else if ($scope.passWord != $scope.users[i].password) {
                
                alert('mật khẩu không đúng');
                return;
            }else{
                alert('đăng nhập thành công ');
                // $rootScope.islogin=true;
                $rootScope.islogin = true;
                location = "#!trangchu";
                $rootScope.hoten=$scope.users[i].fullname;
                return;
                 
            }
            
        }
        // islogin=false;
        if(checkUser === false){
        alert("Tên đăng nhập không đúng");
        return;
    }
        
        
    }
    
});
//Đăng kí
myApp.controller('dangKiCtrl', function ($scope, $location, dataService) {
    $scope.users = [];

    dataService.getData().then(function(res){
        $scope.users = res.data;
        
    });
   
   
    var checkus=true
    $scope.creatAc =function(){
            
           
           
            for(var i=0;i<$scope.users.length; i++){
                var data= {
                    // id: Math.ceil(Math.random()),
                    username: $scope.username,
                    password: $scope.password,
                    fullname :$scope.fullname,
                    email: $scope.email,
                    gender: "",
                    date: $scope.date
                }
                if($scope.users[i].username === $scope.username ){
                    alert("Username này đã tồn tại,vui lòng đăng kí bằng Username khác")
                    checkus=true;
                    return
                }else{
                    
                    checkus=false;
                }
            }
            if(checkus===false){
                dataService.postData(data).then(function(res){
                    alert("Đăng kí thành công");
                    // alert(data);
                    // console.log(data);
                    location = "#!dangnhap";
                    // return;
                })
            }
            
            
                // alert('đăng kí thất bại')     
    }    
});

//Đổi mk
myApp.controller('doiMKCtrl', function ($scope, $location, $window, dataService, $http,$rootScope) {
    $scope.users = [];
    dataService.getData().then(function(res){
        $scope.users = res.data;

        for(var i=0;i<$scope.users.length; i++){
            if($scope.users[i].fullname === $rootScope.hoten){
                
                $scope.tendangnhap = $scope.users[i].username; 
                return;
            }
        }
    });
    $scope.doimk = function(){
        var checkuser=false; 
        for(var i=0;i<$scope.users.length; i++){

            var data ={
                username:$scope.users[i].username,
                password: $scope.newpassword,
                fullname :$scope.users[i].fullname,
                email: $scope.users[i].fullname,
                gender: $scope.users[i].gender,
                date: $scope.users[i].date,
                }
                if($scope.tendangnhap===$scope.users[i].username){
                    var id= $scope.users[i].id;
                    if($scope.users[i].password === $scope.password){
                        var checkuser=true; 
                        dataService.updateData(id,data).then(function(res){
                            alert("update thành công");
                            location = "#!dangnhap";
                            // alert(data);
                            // console.log(data);
                            return;
                        })
                    }
                }
           
        }
        if(checkuser=== false){
            alert("password không đúng");
            
        }
        
        

    }
    // $scope.doiMK =function(){
    //             // alert("doimk")
    //             // id: Math.ceil(Math.random()),
    //             var password= $scope.password;
    //             var checkuser=false;                     
    //              for(var i=0;i<$scope.users.length; i++){
    //                 // console.log($scope.users[i].username);
    //                 if($scope.users[i].password === $scope.password ){ 
    //                     checkuser=true;
    //                     var id= $scope.users[i].id;
    //                     var data ={
    //                     username:$scope.users[i].username,
    //                     password: $scope.newpassword,
    //                     fullname :$scope.users[i].fullname,
    //                     email: $scope.users[i].fullname,
    //                     gender: $scope.users[i].gender,
    //                     date: $scope.users[i].date,
    //                     }
    //                     // alert("tìm được rồi")
    //                     // alert($scope.users[i].username)
    //                     dataService.updateData(id,data).then(function(){
    //                         alert("update thành công");
    //                         location = "#/dangnhap";
    //                         // alert(data);
    //                         // console.log(data);
    //                         return;
    //                     })
    //                 }
    //             }
    //             if(checkuser=== false){
    //                 alert("password không đúng");
                    
    //             }
    //         }    
});

//dang xuất
myApp.controller('dangxuatCtrl', function ($scope, $location, $window, dataService, $http, $rootScope) {
    
   
    //$scope.users = null;
    $scope.dangxuat =function(){
        alert("đăng xuất");
            $rootScope.islogin =false;
            $rootScope.hoten=undefined;
                
            }    
});

myApp.config(function($routeProvider){
    $routeProvider
    .when('/trangchu',{
        templateUrl: "subjects.html",
    })
    .when('/subjects',{
        templateUrl: "subjects.html",
        controller: 'subjectsCtrl'
    })
    .when('/quiz/:id/:name',{
        templateUrl: "quiz-ap.html",
        controller: 'quizsCtrl'
    })
    .when('/gioithieu',{
        templateUrl: "gioiThieu.html"
        
    })
    .when('/lienhe',{
        templateUrl: "lienHe.html"
        
    })
    .when('/gopy',{
        templateUrl: "gopY.html"
        
    })
    .when('/hoidap',{
        templateUrl: "hoiDap.html"
        
    })
    .when('/dangnhap',{
        templateUrl: "dangNhap.html",
        controller: 'loginCtrl'
    })
    .when('/dangky',{
        templateUrl: "dangky.html",
        controller: "dangKiCtrl"
    })
    .when('/doimatkhau',{ 
        templateUrl: "doiMK.html",
        controller: "doiMKCtrl"
        
        
    })
    .otherwise({
        redirectTo: '/dangnhap'
    })
    // myApp.run(function ($rootScope) {
    //     $rootScope.$on("$routeChangeStart", function () {
    //         $rootScope.loading = true;
    //     });
    //     $rootScope.$on("$routeChangeSuccess", function () {
    //         $rootScope.loading = false;
    //     });
    //     $rootScope.$on("$routeChangeError", function () {
    //         $rootScope.loading = false;
    //         alert('Lỗi, không tải được');
    //     });
    // });

    
});
myApp.controller('quizsCtrl',function($scope,$http,$routeParams,quizFactory){
    
    $http.get('./db/Quizs/' +$routeParams.id+'.js').then(function(res){
        
        quizFactory.questions=res.data;
    });
});
myApp.controller('subjectsCtrl',function($scope,$http){
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function(res){
        $scope.list_subject = res.data;
    });
});
myApp.directive('quizfpoly',function(quizFactory,$routeParams,$rootScope){
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quizz.html',
        link: function(scope,elem,attrs){
            scope.start = function(){
                // alert($rootScope.hoten);
                if($rootScope.hoten === undefined){
                    alert("bạn chưa đăng nhập");
                    location= "#/dangnhap"
                    return;
                }else{
                    scope.subjectName=$routeParams.name;
                    quizFactory.getQuestions().then(function(){
                    scope.id=1;
                    scope.quizOver=false; // chưa hoàn thành bài quizz
                    scope.inProgess = true;
                    scope.getQuestion();
                    scope.startCountdown;

                }
                );
                }
  
            };
            scope.reset = function(){
                scope.inProgess = false;
                scope.score = 0;
                
                // scope.startCountdown();
                
                
            };
            
            scope.getQuestion =function(){
                var quiz = quizFactory.getQuestion(scope.id); 
                if(quiz){
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                }else{
                    scope.quizOver=true;
                }
                
                
            }
            scope.checkAnswer=function(){
                
                //  alert(scope.answer)
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                
                if (ans == scope.answer){
                    // alert('dung');
                    scope.score++;
                    scope.correctAns= true;
                }
                else{
                    // alert('sai');
                    scope.correctAns= false;
                }
                scope.answerMode = false;
                
            };
            scope.next=function(){
                scope.id++;
                scope.getQuestion();
            }
            
           
            scope.reset();
        }
    }
});
myApp.factory('quizFactory',function($http,$routeParams){
    
    return {
        getQuestions: function(){
            return $http.get('./db/Quizs/'+$routeParams.id+ '.js').then(function(res){
                questions = res.data;
                // alert(questions.length);
            });
        },
        getQuestion: function(id){
            var randomItem = questions[Math.floor(Math.random()*questions.length)];
            var count= questions.length;
            if(count>10){
                count=10;
            }
            
            if(id < count){
                return randomItem;
            }else{
                return false;
            }
            
        }
    }
});
myApp.controller('countDown', function($scope, $interval) {
    var decreamentCountdown = function() {
        // if($scope.phut == -1){
        //     $scope.phut =0;
        //     return;
        // }else{
            $scope.giay -= 1;
        // }
        
       
        if($scope.giay == 0){
            $scope.phut -= 1;
            $scope.giay = 59;
            startCountdown();
        }
        
    };
    var startCountdown = function() {
        $interval(decreamentCountdown, 1000, $scope.giay)
        if ($scope.phut == -1) {
            alert('Hết thời gian');
            $scope.reset();

        }
    };
    $scope.phut = 9;
    $scope.giay = 60;
    startCountdown();
    
});
