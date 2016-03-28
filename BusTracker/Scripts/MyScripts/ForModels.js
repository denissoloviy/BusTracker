var myApp = angular.module('fupApp', []);

myApp.controller('fupController', function ($scope, $http) {


    $scope.ModelLoad = function () {
        var ddl = document.getElementById("ddl");
        $http({
            method: "POST",
            url: "ModelReturn",
            data: { Id: ddl.value }
        }).then(function (response) {
            $scope.model = null;
            $scope.model = response.data;
            SeatsLoad();
        });
    }

    function SeatsLoad() {
        var ddl = document.getElementById("ddl");
        $http({
            method: "POST",
            url: "SeatsReturn",
            data: { Id: ddl.value }
        }).then(function (response1) {
            $scope.seats = null;
            $scope.seats = response1.data;
            TableCreate();
        });
    }

    function TableCreate() {

        switch ($scope.model.Azone) {
            case 1: document.getElementById("zoneA").src = '/Images/Azone1.png'; break;
            case 2: document.getElementById("zoneA").src = '/Images/Azone2.png'; break;
            case 3: document.getElementById("zoneA").src = '/Images/Azone3.png'; break;
            case 4: document.getElementById("zoneA").src = '/Images/Azone4.png'; break;
        }
        switch ($scope.model.Bzone) {
            case 1: document.getElementById("zoneB").src = '/Images/Bzone1.png'; break;
            case 2: document.getElementById("zoneB").src = '/Images/Bzone2.png'; break;
        }
        var table = document.getElementById("seatstable");
        while (table.rows[0])
            table.deleteRow(0);
        var width2 = $scope.model.Wigth;
        var height2 = $scope.model.Height;
        for (var i = 0; i < width2; i++) {//Вставляємо checkbox
            var row = table.insertRow(0);
            for (var j = 0; j < height2; j++) {
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "name";
                checkbox.value = "false";
                checkbox.id = "id" + i + j + "c";
                var cell = row.insertCell(j);
                cell.appendChild(checkbox);
            }
        }
        var width1 = table.childNodes[0].childNodes[0].childNodes[0].clientWidth;
        var height1 = table.childNodes[0].childNodes[0].childNodes[0].clientHeight;
        for (var i = 0; i < width2; i++) {
            for (var j = 0; j < height2; j++) {//зменшуємо padding клітинок таблиці і добавляємо div
                table.childNodes[0].childNodes[i].childNodes[j].style.paddingTop = "0px";
                table.childNodes[0].childNodes[i].childNodes[j].style.paddingRight = "0px";
                table.childNodes[0].childNodes[i].childNodes[j].style.paddingLeft = "0px";
                table.childNodes[0].childNodes[i].childNodes[j].style.paddingBottom = "0px";
                table.childNodes[0].childNodes[i].childNodes[j].childNodes[0].hidden = true;
                var tempid = table.childNodes[0].childNodes[i].childNodes[j].childNodes[0].id;
                tempid = tempid.substring(0, tempid.length - 1);
                var div = document.createElement("div");
                div.id = tempid;
                div.classList.add("snapper");
                div.style.width = width1 + "px";
                div.style.height = height1 + "px";
                table.childNodes[0].childNodes[i].childNodes[j].appendChild(div);
            }
        }
        for (var i = 0; i < $scope.seats.length; i++) {
            table.childNodes[0].childNodes[$scope.seats[i].Top].childNodes[$scope.seats[i].Left].childNodes[1].style.background = "url('../Images/Table.png') no-repeat";
            table.childNodes[0].childNodes[$scope.seats[i].Top].childNodes[$scope.seats[i].Left].childNodes[1].style.backgroundSize = "contain";
            table.childNodes[0].childNodes[$scope.seats[i].Top].childNodes[$scope.seats[i].Left].childNodes[1].style.backgroundPosition = "center";
        }
    }

    $scope.Delete = function () {
        var ddl = document.getElementById("ddl").value;
        $http({
            method: "DELETE",
            url: "DeleteModel/"+ddl
        }).then(function () {
            location.reload();
        });
    }




});