var app=angular.module('projectAngular',[]);

app.controller('ProjectController',function($scope,$http){

	$scope.counter = 3;
	 $scope.positions = []
	$scope.addProject = function(position){
		console.log($scope.project_name);
		var insertPos = [];
		console.log("--->"+$scope.pos3);
		if($scope.pos1!=null){

			insertPos.push({"skill" : $scope.pos1});
		}
		if($scope.pos2!=null){

			insertPos.push({"skill" : $scope.pos2});
		}
		if($scope.pos3!=null){
			console.log("skill 3 not defined")
			insertPos.push({"skill" : $scope.pos3});
		}
		var c = 4;
		var length = $scope.positions.length;
		for(var i = 0;i<length;i++){
			var l = c + i
			var pos = "skill"+l;
			//var des = "des"+l;
			insertPos.push({pos : position[i].pos});
		}
		console.log("Length--"+insertPos);

		$http({

            method:"POST",
            url:'/doAddProject',
            data : {
                "PROJECT_TITLE":$scope.project_name,
                "PROJECT_DESC":$scope.description,
                "POSITIONS" : insertPos
            }


        }).then(function(res){
        	console.log(res);
        	if(res.data.statusCode == 200){

        		console.log("Project Added!!!");
        	}
        }, function(res) { //this will be called on error
          console.log(res.data);
        });
	}

	$scope.addPosition = function(positions){
			$scope.counter++;
			$scope.positions.push({ "count": $scope.counter , skill: '',des:''});
	            
	 };
	 $scope.count = 0;
	 $scope.projectList = function(){
	 	
	 	$http({

            method:"POST",
            url:'/getProjectList',
            data : {
               
            }


        }).then(function(res){
        	console.log(res.data.result);
        	$scope.projects = res.data.result;
        	
        }, function(res) { //this will be called on error
          console.log(res.data);
        });
	 }
	 $scope.projectList();
});
