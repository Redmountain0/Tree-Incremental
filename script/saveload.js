const defaultSD = {
    point: D(0),
    version: 0,
    upgrade: {
        ppc1: D(0),
        pps1: D(0),
        stat: D(0),
        critp: D(0),
        critm: D(0),
        ppcClick: D(0),
        ppcCrit: D(0),
        ppsTime: D(0),
    },
    start: new Date().getTime(),
    clickCount: D(0),
    critCount: D(0),
    totalPoint: D(0),
    totalClickPoint: D(0),
    totalTimePoint: D(0),
}
let SD = {};

let address = "treeIncremental";

function save() {
    localStorage[address] = btoa(JSON.stringify(SD));
}

function load() {
    if (!localStorage[address]) {
        for (i in defaultSD) {
            SD[i] = defaultSD[i];
        }
        return;
    }
    SD = JSON.parse(atob(localStorage[address]));
    for (i in defaultSD) {
        if (SD[i] !== undefined) continue;
        SD[i] = defaultSD[i];
    }
    for (i in defaultSD.upgrade) {
        if (SD.upgrade[i] !== undefined) continue;
        SD.upgrade[i] = defaultSD.upgrade[i];
    }
    for (i in SD) {
        if (defaultSD[i] instanceof Decimal) {
            SD[i] = D(SD[i])
        }
    }
    for (i in SD.upgrade) {
        if (defaultSD.upgrade[i] instanceof Decimal) {
            SD.upgrade[i] = D(SD.upgrade[i])
        }
    }
}

function hardReset() {
    delete localStorage[address];
    load(address);
}