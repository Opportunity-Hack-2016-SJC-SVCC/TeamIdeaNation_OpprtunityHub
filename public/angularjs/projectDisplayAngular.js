var projectDisplayAngular= angular.module("projectDisplayAngular",[]);


projectDisplayAngular.controller("projectDisplayAngular",['$scope','$http','projectId',function($scope,$http,projectId)
{
        $scope.projectId = projectId;
        $http({

            method:"POST",
            url:'getProjectDetails',
            data : {
                "projectId" : projectId
            }


        }).then(function(res){
            //console.log(JSON.stringify(res.data.results));
                console.log("here");
                $scope.projectTitle = res.data.results.PROJECT_TITLE;
                $scope.projectDesc = res.data.results.PROJECT_DESC;
                $scope.category = res.data.results.CATEGORY;
                $scope.skillSet = res.data.results.SKILL_SET;
                //console.log($scope.skillSet);
                console.log("here1");

        });









        $scope.getProjectDetails=function(){


    }
       $scope.projectId = projectId;
       $http({

           method:"POST",
           url:'getProjectDetails',
           data : {
               "projectId" : projectId
           }


       }).then(function(res){
           //console.log(JSON.stringify(res.data.results));
               console.log(res.data.results.PROJECT_DESC);
               $scope.projectTitle = res.data.results.PROJECT_TITLE;
               $scope.projectDesc = res.data.results.PROJECT_DESC;
               $scope.category = res.data.results.CATEGORY;
               $scope.skillSet = res.data.results.SKILL_SET;
               //console.log($scope.skillSet);
               console.log("here1");

       });
   $scope.getProjectDetails=function(){

   }

}]);
