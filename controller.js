angular.module( 'class-app', [])
.config( function myAppConfig ( ) {})
.run( function run () {})
.controller( 'ClassListCtrl', function AppCtrl ( $scope, Class) {
    $scope.classList = [];
    $scope.selectedTopic =
    Class.getClassList(function(classList){
        $scope.selectedTopic = classList[0]._id.$oid;
        classList.forEach(function(classData){
            Class.getStudentCount(classData._id,function(studentCount){
                classData.studentCount = studentCount;
                $scope.classList.push(classData);
                console.log($scope.classList);
            });
        });
    });
})
.directive( 'plus', function() {
  return {
    restrict:'E',
    link: function( scope, element, attrs ) {

    }
  };
})
.factory('Class',function ClassDI($http){
    var object = new Object();
    var url = 'https://api.mongolab.com/api/1';
    var apiKey = 'CXP9ECp53-FFP7c0GO3rzPhcHosymQd-';
    object.getClassList = function getList(callback){
        $http({method: 'GET', url: url+'/databases/scoreplus/collections/Class'+'?apiKey='+apiKey}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };
    object.getStudentCount = function getList(classId,callback){
        $http({method: 'GET', url: url+'/databases/scoreplus/collections/Student'+'?q={"classId": {"$oid": "5283150ae4b096aaeb8f4a97"}}&c=true&apiKey='+apiKey}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    }
    return object;
})