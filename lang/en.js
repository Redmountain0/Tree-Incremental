let languageSet = {}

languageSet.en = {
    treeNode: {
        main() {return `
            <br><h3>The Root</h3>
            Tree Incremental<br><br>
            <hr>
            <h4>Credit</h4>
            Developed by<br>
            RedMountain<br><br>
            Asset made by<br>
            versebrik<br><br>
            Tree<br>
            spotky1004<br>
        `},
        pps1() {return `
            <br><h3>Upgrade: Point per Sec I</h3>
            Level: ${SD.upgrade.pps1}<br>
            Cost: ${priceMsg(upgrades.pps1.cost())}<br>
            Effect: +${$N(upgrades.pps1.effect())} ppS<br>
            <button class="upgradeBtn" onclick="upgrades.pps1.buy()">Buy</button>
        `},
        ppc1() {return `
            <br><h3>Upgrade: Point per Click I</h3>
            Level: ${SD.upgrade.ppc1}<br>
            Cost: ${priceMsg(upgrades.ppc1.cost())}<br>
            Effect: +${$N(upgrades.ppc1.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppc1.buy()">Buy</button>
        `},
        ppcClick() {return `
            <br><h3>Upgrade: ppC based on Click Count</h3>
            Level: ${SD.upgrade.ppcClick}<br>
            Cost: ${priceMsg(upgrades.ppcClick.cost())}<br>
            Effect: x${$N(upgrades.ppcClick.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcClick.buy()">Buy</button>
        `},
        ppsTime() {return `
            <br><h3>Upgrade: ppS based on Time Played</h3>
            Level: ${SD.upgrade.ppsTime}<br>
            Cost: ${priceMsg(upgrades.ppsTime.cost())}<br>
            Effect: x${$N(upgrades.ppsTime.effect())} ppS<br>
            <button class="upgradeBtn" onclick="upgrades.ppsTime.buy()">Buy</button>
        `},
        ppcCrit() {return `
            <br><h3>Upgrade: ppC based on Crit Count</h3>
            Level: ${SD.upgrade.ppcCrit}<br>
            Cost: ${priceMsg(upgrades.ppcCrit.cost())}<br>
            Effect: x${$N(upgrades.ppcCrit.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcCrit.buy()">Buy</button>
        `},
        critChance() {return `
            <br><h3>Upgrade: Critical Click Chance</h3>
            Level: ${SD.upgrade.critp}<br>
            Cost: ${priceMsg(upgrades.critp.cost())}<br>
            Effect: +${$N(upgrades.critp.effect())}% Crit Chance<br>
            <button class="upgradeBtn" onclick="upgrades.critp.buy()">Buy</button>
        `},
        critMult() {return `
            <br><h3>Upgrade: Critical Click Mult</h3>
            Level: ${SD.upgrade.critm}<br>
            Cost: ${priceMsg(upgrades.critm.cost())}<br>
            Effect: +${$N(upgrades.critm.effect())}% Crit Mult<br>
            <button class="upgradeBtn" onclick="upgrades.critm.buy()">Buy</button>
        `},
        setting() {return `
            <br><h3>Setting</h3>

            <button class="upgradeBtn" onclick="save()">Save</button>
            <button class="upgradeBtn" onclick="load()">Load</button><br>
            <button class="upgradeBtn" onclick="hardReset()" style="color: #a00; background-color: #fcc;">Hard Reset</button>
        `},
        stat() {
            let stat = `
            <br><h3>Statistics</h3>
            Extend Statistics<br>
            Level: ${SD.upgrade.stat} / 1<br>
            Cost: ${priceMsg(upgrades.stat.cost())}<br>
            <button class="upgradeBtn" onclick="upgrades.stat.buy()">Buy</button>
            <hr><br>
            Time Played: ${timeNotation(new Date().getTime()-SD.start)}<br>
            Total Point Gain: ${$N(SD.totalPoint)}<br>`

            if (SD.upgrade.stat.gte(1)) stat += `
            ppC: ${$N(getClickGen())}, ppS: ${$N(getTimeGen())}<br>
            Point gained by click: ${$N(SD.totalClickPoint)}<br>
            Point gained by time: ${$N(SD.totalTimePoint)}<br>`
            
            return stat
        },
        achievement() {return `
            <br><h3>Achievements</h3>
            * Not done yet
        `},
        alphaPoint() {return `
            <br><h3>Alpha Point</h3>
            You have ${$N(SD.alphaPoint)} α points<br><hr><br>
            Level: ${SD.upgrade.alphaPoint}<br>
            Cost: ${priceMsg(upgrades.alphaPoint.cost())}<br>
            Effect: x${$N(upgrades.alphaPoint.effect())} α ppS<br>
            <button class="upgradeBtn" onclick="upgrades.alphaPoint.buy()">Buy</button>
        `},
        prestige() {return `
            <br><h3>Prestige</h3>
            * Not done yet
        `}
    },
    pointDisplay() {
        return `You have <span id="pointDisplayInner">${$N(SD.point)}</span> points`
    }
}