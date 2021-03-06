class Upgrade {
    constructor(id, max, cost, eff) {
        if (!typeof cost == "function") throw new TypeError("cost must be function");
        if (!typeof eff == "function") throw new TypeError("effect must be function");
        this.cost = cost;
        this.id = id;
        this.effect = eff;
        this.maxLv = max;
    }
    
    buyable() {
        let cost = this.cost(SD.upgrade[this.id]);
        for (i in cost) {
            if (SD[i].lt(cost[i])) return false;
        }
        return true;
    }
    
    buy() {
        let cost = this.cost(SD.upgrade[this.id]);
        if (!this.buyable()) return;
        SD.upgrade[this.id] = SD.upgrade[this.id].add(1);
        for (i in cost) {
            SD[i] = SD[i].sub(cost[i]);
        }
    }
}

const upgrades = {
    "ppc1": new Upgrade("ppc1", D(1000), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(12).mul(lv.add(1).pow(1.5)).add(D(5).mul(lv)).add(D(8).mul(D(1.2).pow(lv))).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "pps1": new Upgrade("pps1", D(1000), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(40).mul(lv.pow(1.5)).add(100).add(D(8).mul(D(1.2).pow(lv))).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "stat": new Upgrade("stat", D(2), function(lv=SD.upgrade[this.id]) {
        let priceset = [{point: D(3000)}, {point: D(100000)}, {point: D("1e1e10")}]
        return priceset[lv]
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "critp": new Upgrade("critp", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(2000).mul(D(1.6).pow(lv)).add(D(2000)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "critm": new Upgrade("critm", D(160), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(50000).mul(D(1.6).pow(lv)).add(D(50000)).floor(),
            alphaPoint: lv.pow(1.6).add(1).div(3).ceil()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv.mul(5)
    }),
    "critc": new Upgrade("critc", D(160), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(150000).mul(D(1.6).pow(lv)).add(D(150000)).floor(),
            alphaPoint: lv.pow(1.8).add(4).div(2).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "ppcClick": new Upgrade("ppcClick", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(1500).mul(D(1.6).pow(lv)).add(D(1000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return SD.clickCount.add(1).pow(0.5).log(1.8).div(10).mul(lv.pow(0.7)).add(1)
    }),
    "ppcCrit": new Upgrade("ppcCrit", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(8000).mul(D(1.8).pow(lv)).add(D(3000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return SD.critCount.add(1).pow(0.4).log(1.5).div(5).mul(lv.pow(0.7)).add(1)
    }),
    "ppsTime": new Upgrade("ppsTime", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(5000).mul(D(1.6).pow(lv)).add(D(2000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return D(new Date().getTime()-SD.start).div(1000).add(1).pow(0.3).log(1.8).div(10).mul(lv.pow(0.7)).add(1)
    }),
    "alphaPoint": new Upgrade("alphaPoint", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(100000).mul(D(3).pow(lv)).add(D(200000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv.pow(2)
    }),
}