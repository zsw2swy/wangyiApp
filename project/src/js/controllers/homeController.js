/**
 * Created by lx on 2016/12/2.
 */
angular.module('myApp.home',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.home',{
        url:'/home',
        views:{
            'tabs-home':{
                templateUrl:'home.html',
                controller:'homeController'
            }
        }
    });
}]).controller('homeController',['$scope','$ionicPopup','HttpFactory','$ionicLoading','$timeout','$http','$state','$ionicViewSwitcher','$location','$stateParams',function ($scope,$ionicPopup,HttpFactory,$ionicLoading,$timeout,$http,$state,$ionicViewSwitcher,$location) {
$scope.homeList = {
    homeArray:[]
};
 var aurl = "http://c.m.163.com/nc/topicset/ios/subscribe/manage/listspecial.html" ;
    HttpFactory.getData(aurl).then(function (result) {
        $scope.homeList.homeArray = result.tList;
        $scope.news1 = [];
        for(var i= 0;i<$scope.homeList.homeArray.length;i++ ){
            $scope.news1 = $scope.news1.concat($scope.homeList.homeArray[i].tid);
        }
    });

    $scope.news = {
        // newsArray:[],
        adsArray:[]
    };
    $scope.newsListArray = [];
    var indexId;
    $scope.btnClick = function (indexId) {
        var newsBtn = document.getElementsByClassName('newsBtn')[indexId];
        var urlNew = "http://c.m.163.com/dlist/article/dynamic?from="+ $scope.news1[indexId]+"&offset=0&size=10&fn=1&passport=&devId=%2F3MuOc2%2Ftpr3BFTbGpkB3EkbdABijhZKb0YUM%2BIpk4QLD6gVVgPcP%2BV791ye9IA%2FIIGNeE0nI41SFrBIaL1THA%3D%3D&lat=&lon=&version=17.2";
        HttpFactory.getData(urlNew).then(function (result) {
                $scope.newsListArray = result[$scope.news1[indexId]];
            });
    };


    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        result = result[Object.keys(result)[0]];
        $scope.newsListArray = result.splice(1,10);
        // console.log( $scope.newsListArray);
        if (!result){
            alert("没有更多数据!");
            return;
        }
        //轮播图
        //注意一定要用新的数组接收 不能直接使用$scope.news.adsArray数据 否则不停触发传播和脏值检查
        var img_title_Array = [];
        if (!$scope.news.adsArray.length){
            if(result[0].ads){
                // //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                // $scope.news.adsArray = result[0].ads;
                if (result[0].ads.length){
                    for (var k = 0;k < result[0].ads.length;k++){
                        var obj = {
                            title:result[0].ads[k].title,
                            imgsrc:result[0].ads[k].imgsrc
                        };
                        img_title_Array.push(obj);

                    }
                    $scope.news.adsArray = img_title_Array;
                }
            }
        }
    });

    // var index = 0;
    // $scope.isShowInfinite = true;
    // $scope.loadMore = function (str) {
    //     if(str == '上拉'){
    //         index += 10;
    //     }
    //     var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size="+ index;
    //     HttpFactory.getData(url).then(function (result) {
    //         result = result[Object.keys(result)[0]];
    //         $scope.newsListArray = $scope.newsListArray.concat(result.splice(1,index));
    //         console.log($scope.newsListArray);
    //
    //         $scope.items = result.news1[indexId];
    //         //关闭动画 跟方法无关
    //
    //
    //
    //
    //         $scope.items.splice(0,1);
    //         $scope.$broadcast('scroll.refreshComplete');
    //         if ($scope.items.length < 8){
    //             $scope.isShowInfinite = false;
    //         }else {
    //             $scope.isShowInfinite = true;
    //             //这个上拉加载的事件是告诉程序开启方法的 跟动画无关
    //             $scope.$broadcast('scroll.infiniteScrollComplete');
    //         }
    //     },function (err) {
    //
    //     })
    // };
    // $scope.doSome = function () {
    //     console.log('2222');
    // };
    // $scope.doRefresh = function () {
    //     index = 10;
    //     $scope.loadMore();
    // };
     //进入详情页
    $scope.goToHomeDetail = function ($index) {
        // console.log(index);
        $location.path('/detail/' + $scope.newsListArray[$index].docid);
        //点击那条新闻相应的在详情页中显示
        // $state.go('detail' + $scope.items[index].docid);
        $ionicViewSwitcher.nextDirection("forward");
           //进入详情页动画
        console.log(1111);
    };
    $scope.showDt = function() {


        // 一个精心制作的自定义弹窗
        var myPopup = $ionicPopup.show({
            template: '欢迎登陆新闻资讯网，了解天下动态',
            title: 'Hello'


        });
        $timeout(function() {
            myPopup.close(); //由于某种原因1秒后关闭弹出
        }, 3000);
    };

}]);