languageSet.ko = {
    treeNode: {
        main() { return `
        <br><h3>시작</h3>
        Tree Incremental<br><br>
        <hr>
        <h4>제작진</h4>
        개발<br>
        RedMountain<br><br>
        에셋 제작<br>
        versebrik<br><br>
        나무나무나므나믄무나ㅜㅁ나ㅜㅏ믄므ㅏㅡㅏ<br>
        spotky1004<br>
        `},
        pps1() {return `
            <br><h3>업그레이드: 기본 초당 포인트</h3>
            레벨: ${SD.upgrade.pps1}<br>
            가격: ${priceMsg(upgrades.pps1.cost())}<br>
            효과: +${$N(upgrades.pps1.effect())} ppS<br>
            <button class="upgradeBtn" onclick="upgrades.pps1.buy()">구매</button>
        `},
        ppc1() {return `
            <br><h3>업그레이드: 기본 클릭당 포인트</h3>
            레벨: ${SD.upgrade.ppc1}<br>
            가격: ${priceMsg(upgrades.ppc1.cost())}<br>
            효과: +${$N(upgrades.ppc1.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppc1.buy()">구매</button>
        `},
        ppcClick() {return `
            <br><h3>업그레이드: 클릭 횟수에 비례해서 ppC 증가</h3>
            레벨: ${SD.upgrade.ppcClick}<br>
            가격: ${priceMsg(upgrades.ppcClick.cost())}<br>
            효과: x${$N(upgrades.ppcClick.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcClick.buy()">구매</button>
        `},
        ppsTime() {return `
            <br><h3>업그레이드: 플레이 시간에 비례해서 ppS 증가</h3>
            레벨: ${SD.upgrade.ppsTime}<br>
            가격: ${priceMsg(upgrades.ppsTime.cost())}<br>
            효과: x${$N(upgrades.ppsTime.effect())} ppS<br>
            <button class="upgradeBtn" onclick="upgrades.ppsTime.buy()">구매</button>
        `},
        ppcCrit() {return `
            <br><h3>업그레이드: 크리티컬 횟수에 비례해서 ppC 증가</h3>
            레벨: ${SD.upgrade.ppcCrit}<br>
            가격: ${priceMsg(upgrades.ppcCrit.cost())}<br>
            효과: x${$N(upgrades.ppcCrit.effect())} ppC<br>
            <button class="upgradeBtn" onclick="upgrades.ppcCrit.buy()">구매</button>
        `},
        critChance() {return `
            <br><h3>업그레이드: 크리티컬 확률</h3>
            레벨: ${SD.upgrade.critp}<br>
            가격: ${priceMsg(upgrades.critp.cost())}<br>
            효과: +${$N(upgrades.critp.effect())}% Crit Chance<br>
            <button class="upgradeBtn" onclick="upgrades.critp.buy()">구매</button>
        `},
        critMult() {return `
            <br><h3>업그레이드: 크리티컬 배율</h3>
            레벨: ${SD.upgrade.critm}<br>
            가격: ${priceMsg(upgrades.critm.cost())}<br>
            효과: +${$N(upgrades.critm.effect())}% Crit Mult<br>
            <button class="upgradeBtn" onclick="upgrades.critm.buy()">구매</button>
        `},
        setting() {return `
            <br><h3>설정</h3>

            <button class="upgradeBtn" onclick="save()">저장</button>
            <button class="upgradeBtn" onclick="load()">불러오기</button><br>
            <button class="upgradeBtn" onclick="hardReset()" style="color: #a00; background-color: #fcc;">게임 초기화</button>
        `},
        stat() {
            let stat = `
            <br><h3>통계</h3>
            통계 확장<br>
            레벨: ${SD.upgrade.stat} / 2<br>
            가격: ${priceMsg(upgrades.stat.cost())}<br>
            <button class="upgradeBtn" onclick="upgrades.stat.buy()">구매</button>
            <hr><br>
            플레이 시간: ${timeNotation(new Date().getTime()-SD.start)}<br>
            누적 포인트: ${$N(SD.totalPoint)}<br>`

            if (SD.upgrade.stat.gte(1)) stat += `
            클릭당 포인트 (ppC): ${$N(getClickGen())}, 초당 포인트 (ppS): ${$N(getTimeGen())}<br>
            누적 포인트 (클릭): ${$N(SD.totalClickPoint)}<br>
            누적 포인트 (시간): ${$N(SD.totalTimePoint)}<br>`
            
            return stat
        },
        achievement() {return `
            <br><h3>업적</h3>
            * 미완성
        `},
        alphaPoint() {return `
            <br><h3>알파 포인트</h3>
            * 미완성
        `},
        prestige() {return `
            <br><h3>프레스티지</h3>
            * 미완성
        `},
    },
    pointDisplay() {
        return `현재 <span id="pointDisplayInner">${$N(SD.point)}</span> 포인트 보유 중`
    },
}