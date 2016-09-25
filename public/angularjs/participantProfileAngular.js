var app=angular.module('Participantangular',[]);

app.controller('participantEditController',function($scope,$http){
  $scope.name="";
  $scope.email="";
  $scope.password="";
  $scope.description="";
  $scope.address="";
  $scope.website="";
  $scope.skillSet="";

  $scope.init = function(){
    $http({
      method:"get",
      url:'/participant/display',
      data:{

      }
    }).then(function(res){
      console.log(res.data.session);
      $scope.name=res.data.session.name;
      $scope.email=res.data.session.email;
      $scope.password=res.data.session.password;
      $scope.description=res.data.session.aboutUs;
      $scope.address=res.data.session.address;
      $scope.website=res.data.session.website;
      $scope.skillSet=res.data.session.skillSet;
    },function(res){
      console.log(res.data);
    })
  }

    $scope.doEditParticipant = function(){
      $http({

              method:"POST",
              url:'/participant/edit',
              data : {
                  "name":$scope.name,
                  "email":$scope.email,
                  "password":$scope.password,
                  "description":$scope.description,
                  "address":$scope.address,
                  "website":$scope.website,
                  "skillSet":$scope.skillSet
              }
          }).then(function(res){
          	console.log(JSON.stringify(res));
          	if(res.data.statusCode == 200){
                $scope.alert = "Details updated successfully";
                console.log(res.data.session);
                $scope.name=res.data.session.name;
                $scope.email=res.data.session.email;
                $scope.password=res.data.session.password;
                $scope.description=res.data.session.description;
                $scope.address=res.data.session.address;
                $scope.website=res.data.session.website;
                $scope.skillSet=res.data.session.skillSet;
          	}
            else {
              $scope.alert = "System error occured. Please try again after some time";
            }
          }, function(res) { //this will be called on error
            console.log(res.data);
          });
    }
});
