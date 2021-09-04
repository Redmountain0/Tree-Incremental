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

    // Extra

    // return
    return timeGen
}

function doClickGen() {
    let gen = getClickGen()
    if (chance(upgrades.critp.effect())) {
        gen = gen.mul(D(2).add(D(upgrades.critm.effect()).mul(0.01)));
        SD.critCount = SD.critCount.add(1);
    }
    SD.point = SD.point.add(gen);
    SD.totalPoint = SD.totalPoint.add(gen);
    SD.totalClickPoint = SD.totalClickPoint.add(gen);
    SD.clickCount = SD.clickCount.add(1);
}

function doTimeGen(dt) {
    SD.point = SD.point.add(getTimeGen()*dt);
    SD.totalPoint = SD.totalPoint.add(getTimeGen()*dt);
    SD.totalTimePoint = SD.totalTimePoint.add(getTimeGen()*dt);
}