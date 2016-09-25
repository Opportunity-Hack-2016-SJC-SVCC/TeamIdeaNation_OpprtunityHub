var app=angular.module('NPOangular',[]);

app.controller('NPOEditController',function($scope,$http){
  $scope.name="";
  $scope.email="";
  $scope.password="";
  $scope.aboutUs="";
  $scope.address="";
  $scope.website="";
  $scope.video="";

  $scope.init = function(){
    $http({
      method:"get",
      url:'/NPO/display',
      data:{

      }
    }).then(function(res){
      console.log(res.data.session);
      $scope.name=res.data.session.name;
      $scope.email=res.data.session.email;
      $scope.password=res.data.session.password;
      $scope.aboutUs=res.data.session.aboutUs;
      $scope.address=res.data.session.address;
      $scope.website=res.data.session.website;
      $scope.video=res.data.session.video;
    },function(res){
      console.log(res.data);
    })
  }

    $scope.doEditNPO = function(){
      $http({

              method:"POST",
              url:'/NPO/edit',
              data : {
                  "name":$scope.name,
                  "email":$scope.email,
                  "password":$scope.password,
                  "aboutUs":$scope.aboutUs,
                  "address":$scope.address,
                  "website":$scope.website,
                  "video":$scope.video
              }
          }).then(function(res){
          	console.log(JSON.stringify(res));
          	if(res.data.statusCode == 200){
                $scope.alert = "Details updated successfully";
                console.log(res.data.session);
                $scope.name=res.data.session.name;
                $scope.email=res.data.session.email;
                $scope.password=res.data.session.password;
                $scope.aboutUs=res.data.session.aboutUs;
                $scope.address=res.data.session.address;
                $scope.website=res.data.session.website;
                $scope.video=res.data.session.video;
          	}
            else {
              $scope.alert = "System error occured. Please try again after some time";
            }
          }, function(res) { //this will be called on error
            console.log(res.data);
          });
    }
});
