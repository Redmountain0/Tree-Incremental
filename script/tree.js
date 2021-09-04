class TreeNode {
    constructor(attrs={}) {
        this.connection = attrs.connection ?? attrs.cnt ?? [];
        this.position = attrs.position ?? attrs.pos ?? [0, 0];
        this.size = attrs.size ?? 64;
        this.rawhtml = attrs.rawhtml ?? "";
        this.icon = attrs.icon ?? "./resources/noIcon.png";
        this.unlock = attrs.unlock ?? function() {return true};
        this.id = attrs.id ?? 0;
    }

    render() {
        if ($(`#ID${this.id}.treeNode`)) {
            this.refresh();
            return;
        }
        let nodeDiv = document.createElement('img');
        nodeDiv.classList.add('treeNode');
        nodeDiv.id = `ID${this.id}`;
        nodeDiv.onclick = new Function(`nodeSelected = "${this.id}"`)
        $("#treeDisplay").appendChild(nodeDiv);
    }

    refresh() {
        let nodeDiv = $(`#ID${this.id}.treeNode`);
        let display = "none";
        for (let i in this.connection) {
            if (!treeNodeList.find((e) => e.id == this.connection[i]).unlocked) continue;
            display = "visible";
        }
        if (this.unlock()) {
            this.unlocked = true;
            display = "visible";
        }
        nodeDiv.style.position = "absolute";
        nodeDiv.style.display = display == "visible" ? "block" : "none";
        nodeDiv.style.left = `${100*this.position[0]+($("#treeDisplay").clientWidth-this.size)/2}px`;
        nodeDiv.style.bottom = `${100*this.position[1]+($("#treeDisplay").clientHeight-this.size)/2}px`;
        nodeDiv.width = nodeDiv.height = this.size;
        nodeDiv.src = this.icon;
        if (this.id == nodeSelected) nodeDiv.classList.add('selected');
        else nodeDiv.classList.remove('selected');
        if (display == "visible" && !this.unlocked) {
            nodeDiv.classList.add('locked');
            let lockImg = document.createElement('img');
            lockImg.classList.add('lockImg');
            lockImg.style.left = `${100*this.position[0]+($("#treeDisplay").clientWidth-32)/2}px`;
            lockImg.style.bottom = `${100*this.position[1]+($("#treeDisplay").clientHeight-32)/2}px`;
            lockImg.width = lockImg.height = this.size/2;
            lockImg.src = "./resources/locked.png"
            $("#treeDisplay").appendChild(lockImg);
        } else nodeDiv.classList.remove('locked');
        
        // Code idea by spotky1004
        for (let i in this.connection) {
            let strokeTo = treeNodeList.find((e) => e.id == this.connection[i])
            let strokeDiv = $(`#ID${strokeTo.id}.treeNode`)
            const Line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            Line.setAttribute("x1", Math.floor(nodeDiv.offsetLeft+nodeDiv.offsetWidth/2));
            Line.setAttribute("y1", Math.floor(nodeDiv.offsetTop+nodeDiv.offsetHeight/2));
            Line.setAttribute("x2", Math.floor(strokeDiv.offsetLeft+strokeDiv.offsetWidth/2));
            Line.setAttribute("y2", Math.floor(strokeDiv.offsetTop+strokeDiv.offsetHeight/2));
            Line.style.stroke = "#bbb";
            Line.style.strokeWidth = 4;
            $("#connectLine").append(Line)
        }
    }
}

function treeRender() {
    $All(".lockImg").forEach((a) => {
        a.parentNode.removeChild(a);
    });
    $("#connectLine").innerHTML = ""
    // render tree
    for (let i in treeNodeList) {
        treeNodeList[i].render();
    }

    // render info
    if ($("#infoDisplay").innerHTML == treeNodeList.find((e) => e.id == nodeSelected).rawhtml()) return;
    $("#infoDisplay").innerHTML = treeNodeList.find((e) => e.id == nodeSelected).rawhtml();
}

const treeNodeList = [
    new TreeNode({
        id: "main", cnt: [], icon: "./resources/mainMenu.png",
        position: [0, 0], size: 64,
        rawhtml() {
            return `
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
            `
        },
        unlock() {
            return true;
        },
    }),
    new TreeNode({
        id: "pps1", cnt: ["ppc1"], icon: "./resources/ppsUpgrade.png",
        position: [1, -1], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: Point per Sec I</h3>
            Level: ${SD.upgrade.pps1}<br>
            Cost: ${priceMsg(upgrades.pps1.cost())}<br>
            Effect: +${upgrades.pps1.effect()} ppS<br>
            <button class="upgradeBtn" onclick="upgrades.pps1.buy()">Buy</button>
            `
        },
        unlock() {
            return SD.upgrade.ppc1.gte(8);
        },
    }),
    new TreeNode({
        id: "ppc1", cnt: ["main"], icon: "./resources/ppcUpgrade.png",
        position: [1, 0], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: Point per Click I</h3>
            Level: ${SD.upgrade.ppc1}<br>
            Cost: ${priceMsg(upgrades.ppc1.cost())}<br>
            Effect: +${upgrades.ppc1.effect()} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppc1.buy()">Buy</button>
            `
        },
        unlock() {
            return true;
        },
    }),
    new TreeNode({
        id: "ppcClick", cnt: ["ppc1"], icon: "./resources/ppcClick.png",
        position: [2, 0], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: ppC based on Click Count</h3>
            Level: ${SD.upgrade.ppcClick}<br>
            Cost: ${priceMsg(upgrades.ppcClick.cost())}<br>
            Effect: +${upgrades.ppcClick.effect()} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcClick.buy()">Buy</button>
            `
        },
        unlock() {
            return SD.upgrade.ppc1.gte(15);
        },
    }),
    new TreeNode({
        id: "ppcCrit", cnt: ["ppcClick", "critChance"], icon: "./resources/ppcCrit.png",
        position: [3, 0], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: Point per Click I</h3>
            Level: ${SD.upgrade.ppcCrit}<br>
            Cost: ${priceMsg(upgrades.ppcCrit.cost())}<br>
            Effect: +${upgrades.ppcCrit.effect()} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcCrit.buy()">Buy</button>
            `
        },
        unlock() {
            return SD.upgrade.ppcClick.gte(5) && SD.upgrade.critChance.gte(3);
        },
    }),
    new TreeNode({
        id: "critChance", cnt: ["ppc1"], icon: "./resources/critPercent.png",
        position: [2, 1], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: Critical Click Chance</h3>
            Level: ${SD.upgrade.critp}<br>
            Cost: ${priceMsg(upgrades.critp.cost())}<br>
            Effect: +${upgrades.critp.effect()}% Crit Chance<br>
            <button class="upgradeBtn" onclick="upgrades.critp.buy()">Buy</button>
            `
        },
        unlock() {
            return SD.upgrade.ppc1.gte(10)
        },
    }),
    new TreeNode({
        id: "critMult", cnt: ["critChance"], icon: "./resources/critMult.png",
        position: [3, 1], size: 64,
        rawhtml() {
            return `
            <br><h3>Upgrade: Critical Click Mult</h3>
            Level: ${SD.upgrade.critm}<br>
            Cost: ${priceMsg(upgrades.critm.cost())}<br>
            Effect: +${upgrades.critm.effect()}% Crit Mult<br>
            <button class="upgradeBtn" onclick="upgrades.critm.buy()">Buy</button>
            `
        },
        unlock() {
            return SD.upgrade.critp.gte(5)
        },
    }),
    new TreeNode({
        id: "setting", cnt: ["main"], icon: "./resources/settingMenu.png",
        position: [0, 1], size: 64,
        rawhtml() {
            return `
            <br><h3>Setting</h3>
            `
        },
        unlock() {
            return true;
        }
    }),
    new TreeNode({
        id: "stat", cnt: ["setting"], icon: "./resources/statMenu.png",
        position: [0, 2], size: 64,
        rawhtml() {
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
        unlock() {
            return SD.totalPoint.gte(5000)
        },
        unlockMessage: "5000 Total Point"
    }),
    new TreeNode({
        id: "achievement", cnt: ["setting"], icon: "./resources/achievementMenu.png",
        position: [1, 2], size: 64,
        rawhtml() {
            return `
            <br><h3>Achievements</h3>
            `
        },
        unlock() {
            return SD.totalPoint.gte(10000)
        },
        unlockMessage: "10000 Total Point"
    }),
]

let nodeSelected = "main";