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
            point: D(20).mul(lv.pow(1.5)).add(D(10).mul(lv)).add(D(5).mul(D(1.1).pow(lv))).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "pps1": new Upgrade("pps1", D(1000), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(40).mul(lv.pow(1.5)).add(100).add(D(5).mul(D(1.1).pow(lv))).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "stat": new Upgrade("stat", D(2), function(lv=SD.upgrade[this.id]) {
        priceset = [{point: D(3000)}, {point: D(100000)}, {point: D(Infinity)}]
        return priceset[lv]
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "critp": new Upgrade("critp", D(25), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(1000).mul(D(2).pow(lv)).add(D(500).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return lv
    }),
    "critm": new Upgrade("critm", D(160), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(2000).mul(D(1.5).pow(lv)).add(D(1000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return 5*lv
    }),
    "ppcClick": new Upgrade("ppcClick", D(0), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(2000).mul(D(1.5).pow(lv)).add(D(1000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return 5*lv
    }),
    "ppcCrit": new Upgrade("ppcCrit", D(0), function(lv=SD.upgrade[this.id]) {
        return {
            point: D(2000).mul(D(1.5).pow(lv)).add(D(1000).mul(lv)).floor()
        }
    }, function(lv=SD.upgrade[this.id]) {
        return 5*lv
    }),
}