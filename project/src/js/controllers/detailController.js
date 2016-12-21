angular.module('myApp.detail',[]).controller('detailController',['$scope','$location','$stateParams','$sce','HttpFactory','$ionicPopup', '$timeout',function ($scope,$location,$stateParams,$sce,HttpFactory,$ionicPopup, $timeout) {
    $scope.goTohome = function () {
        $location.url('/tabs/home');

    };
    $scope.newsSummary = {
        detail:'',
        body:''

    };
    // console.log($stateParams.docid);
    var url = "http://localhost:3000/?myUrl=http://c.m.163.com/nc/article/" + $stateParams.docid +"/full.html";
    //详情页借口
    // HttpFactory.getData(url,function (result)
    HttpFactory.getData(url).then(function (result) {
        result = result[Object.keys(result)[0]];
        // $scope.newsSummary.detail = result[$stateParams.docid];
        // var newsObj = $scope.newsSummary.detail;
     // console.log(result);
     //    console.log($scope.newsSummary.detail);

        //获取数据
        var newsObj= result;
        if (newsObj.img && newsObj.img.length){
            for(var i = 0;i < newsObj.img.length;i++){
                var imgWidth = newsObj.img[i].pixel.split('*')[0];
                if(imgWidth > document.body.offsetWidth){
                    imgWidth = document.body.offsetWidth;
                }
                var imgStyle = 'width:' + imgWidth + "px";
                var imgStr = "<img" + " style='" + imgStyle + "'" + " src=" + newsObj.img[i].src + '>';
                newsObj.body = newsObj.body.replace(newsObj.img[i].ref,imgStr);
            }
        }
        $scope.newsSummary.title = $sce.trustAsHtml(newsObj.title);
        //获取标题
        $scope.newsSummary.body = $sce.trustAsHtml(newsObj.body);
        //获取内容
    });

    $scope.showPopup = function() {


        // 一个精心制作的自定义弹窗
        var myPopup = $ionicPopup.show({
            template: '收藏成功',
            title: '收藏'


        });
        $timeout(function() {
            myPopup.close(); //由于某种原因1秒后关闭弹出
        }, 1500);
    };
    $scope.yj = {
        'background':'white'
        // 'color':"white"
    }

    $scope.yj = JSON.stringify( $scope.yj);
    $scope.yj = JSON.parse( $scope.yj);
    console.log($scope.yj.background);
    $scope.changeBackGroundColor = function(){
        if($scope.yj.background == "black"){
         $scope.yj = {
            "background":'white',
            // 'color':"white"
        }
        console.log(1111)
    }else{
            $scope.yj = {
                "background":'black',
                'color':"white"
            }
        }
    }
}]);