function SeatsCreate() {
    var images = document.getElementsByClassName("draggable");
    for (var i = 0; i < images.length; i++) {
        var s1 = images[i].id + "t";
        var top1 = document.getElementById(s1);
        var s2 = images[i].id + "l";
        var left1 = document.getElementById(s2);
        left1.value = images[i].style.left;
        top1.value = images[i].style.top;
    }
}