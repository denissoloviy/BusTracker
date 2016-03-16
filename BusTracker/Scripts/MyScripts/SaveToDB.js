function Save() {
    var images = document.getElementsByClassName("draggable");
    var busModel = document.getElementById("busmodel").value;
    var num = [];
    var top = [];
    var left = [];
    for (var i = 0; i < images.length; i++)
    {
        var s1 = images[i].id + "t";
        var top1 = document.getElementById(s1);
        var s2 = images[i].id + "l";
        var left1 = document.getElementById(s2);
        num.push(images[i].id);
        top.push(top1.value);
        left.push(left1.value);
    }

    var SendBus = new XMLHttpRequest();
    var data = new FormData();
    data.append("busModel", busModel);
    data.append("num", num);
    data.append("top", top);
    data.append("left", left);
    SendBus.open("POST", "Post");
    SendBus.send(data);
}