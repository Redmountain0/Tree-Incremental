function getClickGen() {
    // Default
    let clickGen = D(1);

    // Additive
    clickGen = clickGen.add(upgrades.ppc1.effect())

    // Multiplicative
    clickGen = clickGen.mul(upgrades.ppcClick.effect())
    clickGen = clickGen.mul(upgrades.ppcCrit.effect())

    // Extra

    // return
    return clickGen
}

function getTimeGen() {
    // Default
    let timeGen = D(0);

    // Additive
    timeGen = timeGen.add(SD.upgrade.pps1)

    // Multiplicative
    timeGen = timeGen.mul(upgrades.ppsTime.effect())
    
    // Extra

    // return
    return timeGen
}

function getAlphaGen() {
    return D(1).div(60).mul(upgrades.alphaPoint.effect());
}

function doClickGen() {
    let gen = getClickGen()
    if (chance(upgrades.critp.effect())) {
        gen = gen.mul(D(2).add(D(upgrades.critm.effect()).mul(0.01)));
        SD.critCount = SD.critCount.add(1);
        SD.clickCount = SD.clickCount.add(upgrades.critc.effect());
    }
    SD.point = SD.point.add(gen);
    SD.totalPoint = SD.totalPoint.add(gen);
    SD.totalClickPoint = SD.totalClickPoint.add(gen);
    SD.clickCount = SD.clickCount.add(1);
}

function doTimeGen(dt) {
    SD.point = SD.point.add(getTimeGen().mul(dt));
    SD.totalPoint = SD.totalPoint.add(getTimeGen().mul(dt));
    SD.totalTimePoint = SD.totalTimePoint.add(getTimeGen().mul(dt));
    SD.alphaPoint = SD.alphaPoint.add(getAlphaGen().mul(dt));
    SD.totalAlphaPoint = SD.totalAlphaPoint.add(getAlphaGen().mul(dt));

    if (SD.alphaPoint.gte(5)) SD.alphaPoint = D(5);
}