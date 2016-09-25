var app=angular.module('NPOHomeAngular',[]);

app.controller('NPOHomeAngular',function($scope,$http){

	console.log("try this");

	$scope.init = function()
	{
		$http({
			method:"GET",
      url:'/projects/displayAll',
			data:{

			}
		}).then(function(res){
			console.log(res);
			if(res.data.statusCode == 200)
			{
				$scope.name = res.data.projects[0].NAME;
				$scope.arrayObject = res.data.projects;
			}
			else if(res.data.statusCode == 401){

			}
		},function(res){
				console.log(res);
		})
	}

	$scope.createNewProject = function()
	{
		window.location.assign("/projects/getProjectAddPage");
	}


}
);
