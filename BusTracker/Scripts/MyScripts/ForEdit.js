function AzoneChange(nameOfImage) {//Змінюємо вид zoneA
    document.getElementById("zoneA").src = nameOfImage;
}

function BzoneChange(nameOfImage) {//Змінюємо вид zoneB
    document.getElementById("zoneB").src = nameOfImage;
}

function SeatTableChange() {//Створюємо таблицю
    var table = document.getElementById("seatstable");
    var width2 = document.getElementById("wight").value;
    var height2 = document.getElementById("height").value;
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
    width1 = table.childNodes[0].childNodes[0].childNodes[0].clientWidth;
    height1 = table.childNodes[0].childNodes[0].childNodes[0].clientHeight;
    var q = document.getElementById("seat");//розмір перетягуємого зображення = розміру клітинки таблиці
    q.style.width = width1 - 3 + "px";
    q.style.height = 45 * (width1 - 3) / 54 + "px";
    var q = document.getElementById("seat1");
    q.style.width = width1 - 3 + "px";
    q.style.height = 45 * (width1 - 3) / 54 + "px";
}

function Save() {//Зберігаємо в базу даних
    var table = document.getElementById("seatstable");
    var busModel = document.getElementById("busmodel").value;
    var arr = new Array();
    for (var i = 0; i < document.getElementById("wight").value; i++) {
        arr[i] = new Array();
        for (var j = 0; j < document.getElementById("height").value; j++) {
            arr[i][j] = table.childNodes[0].childNodes[i].childNodes[j].childNodes[0].checked;
        }
    }
    var Azone = document.getElementById("zoneA").src.substring(0, document.getElementById("zoneA").src.length - 4);
    Azone = Azone.charAt(Azone.length - 1);
    var Bzone = document.getElementById("zoneB").src.substring(0, document.getElementById("zoneB").src.length - 4);
    Bzone = Bzone.charAt(Bzone.length - 1);

    var SendBus = new XMLHttpRequest();
    var data = new FormData();
    data.append("busModel", busModel);
    data.append("Azone", Azone);
    data.append("Bzone", Bzone);
    data.append("wight", document.getElementById("wight").value);
    data.append("height", document.getElementById("height").value);
    data.append("arr", arr);
    SendBus.open("POST", "api/Edit/SavePost/");
    SendBus.send(data);
}


function Qwer() {//Перетягування
    $('.draggable').draggable({
        //snap: ".snapper",
        //snapMode: "inner",
        //snapTolerance: 10,
        helper: "clone"
    });

    $('.snapper').droppable({
        drop: function () {
            document.getElementById($(this).attr("id") + "c").checked = true;
            document.getElementById($(this).attr("id")).style.background = "url('../Images/Table.png') no-repeat";
            document.getElementById($(this).attr("id")).style.backgroundSize = "contain";
            document.getElementById($(this).attr("id")).style.backgroundPosition = "center";
        },
        tolerance: "intersect"
    });
}