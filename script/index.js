const $ = (selector) => document.querySelector(selector);
const $All = $A = (selector) => document.querySelectorAll(selector);
const D = (num) => new Decimal(num);

const $N = toNotation = function(decimal) {
    if (decimal.eq(D(Infinity))) return "Infinity";
    if (decimal.gt("e10000")) return $N_Logarithm(decimal);
    if (decimal.gt(1e7)) return $N_Exponential(decimal);
    if (decimal.gt(1000)) return $N_Commas(decimal);
    return $N_Decimal(decimal);
}

function $N_Logarithm(decimal) {
    return `e${decimal.log(10).floor()}`;
}

function $N_Exponential(decimal) {
    let exp = decimal.log(10).floor();
    return `${decimal.div(D(10).pow(exp))}e${exp}`;
}

function $N_Commas(decimal) {
    return Math.floor(decimal.valueOf()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function $N_Decimal(decimal) {
    let exp = decimal.log(10).floor();
    return Number(decimal.valueOf()).toFixed(2-exp);
}

function chance(number) {
    return Math.random() <= number/100;
}

function timeNotation(sec) {
    sec /= 1000;
    if (sec > 3600*24*365*100) return ">100 years";
    if (sec > 3600*24*365) return `${(sec/3600/24/365).toFixed(3)}y`;
    if (sec > 3600*24) return `${(sec/3600/24).toFixed(2)}d`;
    if (sec > 3600) return `${(sec/3600).toFixed(2)}h`;
    if (sec > 60) return `${(sec/60).toFixed(2)}m`;
    if (sec > 1) return `${(sec).toFixed(1)}s`;
    return `${(sec*1000).toFixed(0)}ms`;
}

function priceMsg(price) {
    let priceName = {"point": "points", "alphaPoint": "α points"};
    let msg = "";
    for (let i in price) {
        msg += `${$N(price[i])} ${priceName[i]} /`;
    }
    return msg.slice(0, -1);
}