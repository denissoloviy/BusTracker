window.onload = function () {
    var images = document.getElementsByClassName("draggable");
    for (var i = 0; i < images.length; i++)
    {
        images[i].style.position = 'fixed';
        var s = images[i].id + "a";
        var imgtext = document.getElementById(s);
        var s1 = images[i].id + "t";
        var top1 = document.getElementById(s1);
        var s2 = images[i].id + "l";
        var left1 = document.getElementById(s2);
        imgtext.style.position = 'fixed';
        images[i].style.left = left1.value;
        images[i].style.top = top1.value;
        imgtext.style.left = left1.value;
        imgtext.style.top = top1.value;
        images[i].style.position = 'absolute';
        imgtext.style.position = 'absolute';
    }
}