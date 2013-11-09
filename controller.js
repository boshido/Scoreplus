angular.module( 'topic-app', [])
.config( function myAppConfig ( ) {})
.run( function run () {})
.controller( 'TopicListCtrl', function AppCtrl ( $scope, Topic, Country) {

    /* Tools Function */
    function loadTopic(){
        Topic.getList(function(data){
            $scope.topicLists = data;
            $scope.selectTopic($scope.selectedTopic || data[0]['_id']);
        });
        Country.get(function(data){
            $scope.contries = data;
        });
    }
    function setFormat(param){
        var result = param;
        var tmp = result;
        result = new Array();
        for(var y in tmp){
            result.push({type:y,data:tmp[y]});
        }
        return result;
    }
    function clearFormat(param){
        var result = param;
        var tmp = result;
        result = new Object();
        for(var y in tmp){
             result[tmp[y].type] = tmp[y].data;
        }
        return result;
    }

    /* Form Event */
    $scope.selectTopic = function selectTopic(id){
        $scope.selectedTopic = id;
        Topic.getContent({'_id':id},function(data){

            //data[0].languages = setFormat(data[0].languages);
            $scope.content = data[0];
            $scope.title = data[0].id;
            $scope.subtitle = data[0].where;
        });
    }

    $scope.addNewTopic = function addNewTopic(){
        $scope.content = new Object();
        $scope.content.languages = new Object();
        $scope.title = 'Add new topic';
        $scope.subtitle = '-';
        $scope.selectedTopic = '';
    }
    $scope.addNewLanguage = function addNewLanguage(){
        console.log($scope.content);
    }


    /* CRUD */
    $scope.addTopic = function addTopic(){

        Topic.add($scope.content,function(data){
            loadTopic();
        });

    }
    $scope.updateTopic = function updateTopic(){
        /*var tmp = $scope.content;
        {_id:tmp['_id'],id:tmp.id,where:tmp.where,languages:clearFormat(tmp.languages)}*/
        Topic.update($scope.content,function(data){
            loadTopic();
        });
    }
    $scope.removeTopic = function deleteTopic(id){
        Topic.remove({'_id':id},function(data){
             $scope.selectedTopic='';
            loadTopic();
        });
    }

    loadTopic();
})
.directive( 'plus', function() {
  return {
    restrict:'E',
    link: function( scope, element, attrs ) {

    }
  };
})
.factory('Topic',function TopicDI($http){
    var object = new Object();

    object.getList = function getList(callback){
        $http({method: 'GET', url: '/api/topic/list'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };
    object.getContent = function getContent(params,callback){
        $http({method: 'GET', params:params, url: '/api/topic'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };


    /* CRUD */
    object.add = function add(params,callback){
        $http({method: 'POST', params:params, url: '/api/topic'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };
    object.update = function update(params,callback){
        $http({method: 'PUT', params:params, url: '/api/topic'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };
    object.remove = function remove(params,callback){
        $http({method: 'DELETE', params:params, url: '/api/topic'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };


    return object;
})
.factory('Country',function CountryDI($http){
    var object = new Object();
    object.get = function get(callback){
        $http({method: 'GET', url: '/api/topic/country'}).
          success(function(data, status, headers, config) {
            callback(data);
          }).
          error(function(data, status, headers, config) {});
    };

    return object;
});
