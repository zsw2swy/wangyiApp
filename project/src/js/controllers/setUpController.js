/**
 * Created by lx on 2016/12/2.
 */
angular.module('myApp.setUp',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.setUp',{
        url:'/setUp',
        views:{
            'tabs-setUp':{
                templateUrl:'setUp.html',
                controller:'setUpController'
            }
        }
    });
}]).controller('setUpController',['$scope',function ($scope) {
    // $scope.swy = function () {
    //     $scope.zsw = {
    //         "backgroundColor" : "red"
    //     }
    // };
    //
    // console.log(1111);
}]);