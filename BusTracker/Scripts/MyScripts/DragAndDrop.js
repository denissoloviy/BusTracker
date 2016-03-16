﻿document.onmousedown = function (e) {

    var dragElement = e.target;

    if (!dragElement.classList.contains('draggable')) return;

    //if (dragElement.classList.contains('imgtext')) {
    //    var s = dragElement.id;
    //    s = s.substring(0, s.length - 1);
    //    var imgtext = document.getElementById(s);
    //    var s1 = s + "t";
    //    var top1 = document.getElementById(s1);
    //    var s2 = s + "l";
    //    var left1 = document.getElementById(s2);
    //}
    //else {
        var s = dragElement.id + "a";
        var imgtext = document.getElementById(s);
        var s1 = dragElement.id + "t";
        var top1 = document.getElementById(s1);
        var s2 = dragElement.id + "l";
        var left1 = document.getElementById(s2);
    //}

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
        // конец переноса, перейти от fixed к absolute-координатам
        dragElement.style.position = 'absolute';
        imgtext.style.position = 'absolute';

        document.onmousemove = null;
        dragElement.onmouseup = null;
    }

    function moveAt(clientX, clientY) {
        // новые координаты
        var newX = clientX - shiftX;
        var newY = clientY - shiftY;

        // ------- обработаем вынос за нижнюю границу окна ------
        // новая нижняя граница элемента
        var newBottom = newY + dragElement.offsetHeight;

        // если новая нижняя граница вылезает вовне окна - проскроллим его
        if (newBottom > document.documentElement.clientHeight) {
            // координата нижней границы документа относительно окна
            var docBottom = document.documentElement.getBoundingClientRect().bottom;

            // scrollBy, если его не ограничить - может заскроллить за текущую границу документа
            // обычно скроллим на 10px
            // но если расстояние от newBottom до docBottom меньше, то меньше
            var scrollY = Math.min(docBottom - newBottom, 10);

            // ошибки округления при полностью прокрученной странице
            // могут привести к отрицательному scrollY, что будет означать прокрутку вверх
            // поправим эту ошибку
            if (scrollY < 0) scrollY = 0;

            window.scrollBy(0, scrollY);

            // резким движением мыши элемент можно сдвинуть сильно вниз
            // если он вышел за нижнюю границу документа -
            // передвигаем на максимально возможную нижнюю позицию внутри документа
            newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
        }


        // ------- обработаем вынос за верхнюю границу окна ------
        if (newY < 0) {
            // проскроллим вверх на 10px, либо меньше, если мы и так в самом верху
            var scrollY = Math.min(-newY, 10);
            if (scrollY < 0) scrollY = 0; // поправим ошибку округления

            window.scrollBy(0, -scrollY);
            // при резком движении мыши элемент мог "вылететь" сильно вверх, поправим его
            newY = Math.max(newY, 0);
        }


        // зажать в границах экрана по горизонтали
        // здесь прокрутки нет, всё просто
        if (newX < 0) newX = 0;
        if (newX > document.documentElement.clientWidth - dragElement.offsetHeight) {
            newX = document.documentElement.clientWidth - dragElement.offsetHeight;
        }
        //var w = document.body.clientWidth,
        //h = document.body.clientHeight;


        var w = window.innerWidth; // ширина  
        var h = window.innerHeight; // высота  
        dragElement.style.left = newX / w * 100 + '%';
        dragElement.style.top = newY /*/ h * 100*/ + 'px';
        imgtext.style.left = newX / w * 100 + '%';
        imgtext.style.top = newY /*/ h * 100*/ + 'px';
        left1.value = newX / w * 100 + '%';
        top1.value = newY /*/ h * 100*/ + 'px';
    }

    // отменим действие по умолчанию на mousedown (выделение текста, оно лишнее)
    return false;
}