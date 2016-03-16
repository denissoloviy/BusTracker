var myApp = angular.module('fupApp', []).directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    //on-finish-render
                    var images = document.getElementsByClassName("draggable");
                    for (var i = 0; i < images.length; i++) {
                        var s = images[i].id + "a";
                        var imgtext = document.getElementById(s);
                        var s1 = images[i].id + "t";
                        var top1 = document.getElementById(s1);
                        var s2 = images[i].id + "l";
                        var left1 = document.getElementById(s2);
                        images[i].style.left = left1.value;
                        images[i].style.top = top1.value;
                        imgtext.style.left = left1.value;
                        imgtext.style.top = top1.value;
                    }
                    //викликається після останньої ітерації ng-repeat
                });
            }
        }
    }
});
myApp.controller('fupController', function ($scope, $http) {
    $scope.SeatsLoad = function () {
        var ddl = document.getElementById("ddl");
        $http({
            method: "POST",
            url: "ForChoice",
            data: {Id : ddl.value}
        }).then(function (response) {
            $scope.seats = response.data;
        });
    }

    $scope.Delete = function () {
        var ddl = document.getElementById("ddl");
        $http({
            method: "DELETE",
            url: "Delete/" + ddl.value,
        }).then(function () {
            location.reload();
        });
    }
});