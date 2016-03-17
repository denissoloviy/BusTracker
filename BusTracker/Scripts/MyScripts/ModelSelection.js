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
    $scope.allow = false;
    document.getElementById("ddl").onchange = 
    function ValueChanged() {
        document.getElementById("busmodel").value = document.getElementById("ddl").options[document.getElementById("ddl").selectedIndex].text;
    }


    $scope.SeatsLoad = function () {
        var ddl = document.getElementById("ddl");
        $http({
            method: "POST",
            url: "ForChoice",
            data: {Id : ddl.value}
        }).then(function (response) {
            $scope.seats = null;
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

    $scope.Edit = function () {
        var ddl = document.getElementById("ddl");
        $http({
            method: "POST",
            url: "Edit",
            data: { Busmodelid: ddl.value }
        });
    }

    $scope.Allow = function () {
        $scope.allow = true;
    }

    $scope.DisAllow = function () {
        $scope.allow = false;
    }

    document.onmousedown = function (e) {

        if ($scope.allow) {
            var dragElement = e.target;

            if (!dragElement.classList.contains('draggable')) return;

            var s = dragElement.id + "a";
            var imgtext = document.getElementById(s);
            var s1 = dragElement.id + "t";
            var top1 = document.getElementById(s1);
            var s2 = dragElement.id + "l";
            var left1 = document.getElementById(s2);

            var coords, shiftX, shiftY;


            startDrag(e.clientX, e.clientY);

            document.onmousemove = function (e) {
                moveAt(e.clientX, e.clientY);
            };

            dragElement.onmouseup = function () {
                finishDrag();
            };


            // -------------------------

            function startDrag(clientX, clientY) {

                shiftX = clientX - dragElement.getBoundingClientRect().left;
                shiftY = clientY - dragElement.getBoundingClientRect().top;

                dragElement.style.position = 'fixed';
                imgtext.style.position = 'fixed';

                document.body.appendChild(dragElement);

                moveAt(clientX, clientY);
            };

            function finishDrag() {
                dragElement.style.position = 'absolute';
                imgtext.style.position = 'absolute';

                document.onmousemove = null;
                dragElement.onmouseup = null;
            }

            function moveAt(clientX, clientY) {
                var newX = clientX - shiftX;
                var newY = clientY - shiftY;

                var newBottom = newY + dragElement.offsetHeight;

                if (newBottom > document.documentElement.clientHeight) {
                    var docBottom = document.documentElement.getBoundingClientRect().bottom;

                    var scrollY = Math.min(docBottom - newBottom, 10);

                    if (scrollY < 0) scrollY = 0;

                    window.scrollBy(0, scrollY);

                    newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
                }

                if (newY < 0) {
                    var scrollY = Math.min(-newY, 10);
                    if (scrollY < 0) scrollY = 0;

                    window.scrollBy(0, -scrollY);
                    newY = Math.max(newY, 0);
                }

                if (newX < 0) newX = 0;
                if (newX > document.documentElement.clientWidth - dragElement.offsetHeight) {
                    newX = document.documentElement.clientWidth - dragElement.offsetHeight;
                }


                var w = window.innerWidth; // ширина  
                var h = window.innerHeight; // высота  
                dragElement.style.left = newX / w * 100 + '%';
                dragElement.style.top = newY /*/ h * 100*/ + 'px';
                imgtext.style.left = newX / w * 100 + '%';
                imgtext.style.top = newY /*/ h * 100*/ + 'px';
                left1.value = newX / w * 100 + '%';
                top1.value = newY /*/ h * 100*/ + 'px';
            }

            return false;
        }
    }
});