let lastTick = new Date().getTime();
let tickperSec = 20;

function mainLoop() {
    let dt = (new Date().getTime() - lastTick) / 1000;
    treeRender();
    infoRender();
    doTimeGen(dt);

    lastTick = new Date().getTime();

    setTimeout(mainLoop, 1000/tickperSec);
}

function saveLoop() {
    save();

    setTimeout(saveLoop, 10*1000);
}

function infoRender() {
    $("#pointDisplay").innerHTML = languageSet[SD.lang].pointDisplay();
}