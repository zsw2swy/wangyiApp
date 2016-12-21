/**
 * Created by lx on 2016/12/2.
 */
angular.module("myApp.tabs",[]).controller('tabsController',['$scope','$ionicBackdrop',function ($scope,$ionicBackdrop) {
    $scope.$on('$stateChangeSuccess',function (evt,current,previous) {
        var update_wx_title = function(title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "../empty.png");
            iframe.addEventListener('load', function() {
                setTimeout(function() {
                    // iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                });
            });
            document.body.appendChild(iframe);
        };
        switch (current.url){
            case '/home':
                update_wx_title("首页");
                break;
            case '/setUp':
                update_wx_title("话题");
                break;
            case '/other':
                update_wx_title("设置");
                break;
            case '/personal':
                update_wx_title("个人中心");
                break;

        }


    });
    $scope.zsw = {
        'background':'white'
        // 'color':"white"
    };
    $scope.zsw = JSON.stringify( $scope.zsw);
    $scope.zsw = JSON.parse( $scope.zsw);
    $scope.changeBackGroundColor = function(){
        if($scope.zsw.background == "white"){
            $scope.zsw = {
                "background":'black',
                'color':"white"
            };
            console.log(1111)
        }else{
            $scope.zsw = {
                "background":'white'
                // 'color':"white"
            }
        }
    }


}]);
