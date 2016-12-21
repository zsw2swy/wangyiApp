/**
 * Created by lx on 2016/12/2.
 */
angular.module('myApp.other',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.other',{
        url:'/other',
        views:{
            'tabs-other':{
                templateUrl:'other.html',
                controller:'otherController'
            }
        }
    });
}]).controller('otherController',['$scope','$stateParams','$sce','HttpFactory','$ionicPopup', '$timeout','$interval',function ($scope,$stateParams,$sce,HttpFactory,$ionicPopup,$timeout,$interval) {
    $scope.live = {
        slideSource:[],
        futureSource:[],
        live_review1:[]
    };
    //设置轮播图
    var url = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(url).then(function (result) {
        var img_title_Array = [];
        if (result.top.length){
            for (var i = 0;i < result.top.length;i++){
                var obj = {
                    title:result.top[i].roomName,
                    imgsrc:result.top[i].image
                };
                console.log(result);

                img_title_Array.push(obj);

            }
            // console.log(img_title_Array);
            $scope.live.slideSource = img_title_Array;

        }

        var future_title_Array = [];
        if(result.future.length) {
            for (var i = 0; i < result.future.length; i++) {
                var obj = {
                    title: result.future[i].roomName

                };
                // console.log(obj.title);
                // console.log(result.future);
                future_title_Array.push(obj.title);
            }
//设置预告轮播
            var index = 0;
      var intervalId = $interval(function () {


                if(index >= 0 && index < 37){
                    index++;
                    $scope.live.interSpan = future_title_Array[index];
                }if (index >= 37 ){
                    index = 0;

          }

            },2000);


            // $scope.$on("$destroy")

        }
        console.log( result.live_review[7].roomName);
      $scope.live.live_review1 = result.live_review;
        console.log(result);

    });


}]);