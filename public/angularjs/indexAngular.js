
var app=angular.module('indexAngular',[]);

app.controller('LoginController',function($scope,$http){


	$scope.doLogin=function(){
		console.log("doLogin-->");
		console.log($scope.email);
		$http({

            method:"POST",
            url:'/doLogin',
            data : {
                "email":$scope.email,
                "password":$scope.password
            }


        }).then(function(res){
        	console.log(JSON.stringify(res));
        	if(res.data.statusCode == 200){

        		if(res.data.results.USERTYPE == 1){
        			console.log("NPO");
        		}
        		else if(res.data.results.USERTYPE == 1){
        			console.log("Participant")
        		}
        	}
        }, function(res) { //this will be called on error
          console.log(res.data);
        });
	}
});


app.controller('SignUpController',function($scope,$http){

	$scope.hideError = true;
	$scope.user = {
		type:"user"
	};

	$scope.doSignUp=function(){
		console.log("doSignUp-->");
		console.log($scope.email);
		console.log($scope.user);
		alert($scope.user.type);
		console.log($scope);
		if($scope.password != $scope.confirmpwd){
			$scope.hideError = false;
		}
		else{
		$http({

            method:"POST",
            url:'/doUserSignup',
            data : {
            	"name":$scope.name,
                "email":$scope.email,
                "password":$scope.password,
                "usertype":$scope.category
            }


        }).then(function(res){
        	console.log(JSON.stringify(res));
        	if(res.data.statusCode == 200){

        		if(res.data.results.USERTYPE == 1){
        			console.log("NPO");
        		}
        		else if(res.data.results.USERTYPE == 1){
        			console.log("Participant")
        		}
        	}
        }, function(res) { //this will be called on error
          		console.log(res.data);
        	});
		}
	}
});
