var app=angular.module('participantHomeAngular',[]);

app.controller('participantHomeAngular',function($scope,$http){

	console.log("try this");

	$scope.init = function()
	{
		$http({
			method:"GET",
      url:'/projects/displayAll',
			data:{

			}
		}).then(function(res){

		},function(res){

		})
	}

	$scope.createNewProject = function()
	{
		console.log("try this 1");
		window.location.assign("/projects/getProjectAddPage");
	}


}
);
