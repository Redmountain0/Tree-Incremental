window.onload = function() {
    load();

    $("#clickDisplay").onclick = function() {
        doClickGen();
    }
    $("body").ondragstart = () => false;
    $("body").onselectstart = () => false;


    mainLoop();
    saveLoop();
}