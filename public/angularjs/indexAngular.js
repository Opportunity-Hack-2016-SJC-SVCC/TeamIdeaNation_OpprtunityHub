
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
                    window.location.assign("/NPOgetHomepage");
        		}
        		else if(res.data.results.USERTYPE == 2){
        			console.log("Participant");
							window.location.assign("/volunteerHome");
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
		//alert($scope.user.type);
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
                "usertype":$scope.user.type
            }


        }).then(function(res){
        	//alert(JSON.stringify(res));
        	if(res.data.statusCode == 200){

        		if(res.data.USERTYPE == 1){
        			console.log("NPO");
							var path = "/NPO/edit/"+res.data.userId;
							window.location.assign("/nextStep");
        		}
        		else if(res.data.USERTYPE == 2){
        			console.log("Participant");
							window.location.assign('/nextStepParticipant');
        		}
        	}
        }, function(res) { //this will be called on error
          		console.log(res.data);
        	});
		}
	}
});
