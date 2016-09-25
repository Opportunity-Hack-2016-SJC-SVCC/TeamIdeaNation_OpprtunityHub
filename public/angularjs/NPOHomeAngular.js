var app=angular.module('NPOHomeAngular',[]);

app.controller('NPOHomeAngular',function($scope,$http){

	console.log("try this");

	$scope.createNewProject = function()
	{
		window.location.assign("/projects/getProjectAddPage");
	}


}
);