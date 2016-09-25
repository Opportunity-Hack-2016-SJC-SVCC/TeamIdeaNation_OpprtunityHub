
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