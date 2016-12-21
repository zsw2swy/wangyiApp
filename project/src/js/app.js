/**
 * Created by lx on 2016/12/2.
 */
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.home','myApp.person','myApp.other','myApp.setUp','myApp.detail','myApp.login']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    }).state('detail',{
        url:'/detail/:docid',

        templateUrl:'detail.html',
        controller:'detailController'

    }).state('login',{
        url:'/login',

        templateUrl:'login.html',
        controller:'loginController'

    });
    $urlRouterProvider.otherwise('/login');
}]);