import { awardPoints, experienceToNextLevel, xpPerBrew } from '../config.js';


const reduceAdd = (total, num) => total + num;

const findLevelIndex  = (levelsArr, xp) => {
    let xpLevels = 0;
    let idx = 0;
    levelsArr.forEach((val,i) => {
        xpLevels +=val;
        if (xp >= xpLevels) idx = i;
    });
    return idx;
}

export default function getLevelsPointsForBrew(brewCount, rankName, levelsCount) {

    const brewTotalXpMin = brewCount * xpPerBrew.bad;
    const brewTotalXpMax = brewCount * xpPerBrew.good;

    let levelsMin, levelsMax,
        pointsMin, pointsMax;
    const xpToRankUp = experienceToNextLevel[rankName].reduce(reduceAdd, 0);
    //console.log('rankName', rankName, 'levelsCount', levelsCount);
    //console.log('xpToRankUp', xpToRankUp);

    // min
    const levelUpsMinFull = Math.floor(brewTotalXpMin / xpToRankUp);
    const levelUpsMinPart = brewTotalXpMin - levelUpsMinFull * xpToRankUp;

    levelsMin = levelUpsMinFull * levelsCount;
    if (levelUpsMinPart > 0)  {
        const index = findLevelIndex(experienceToNextLevel[rankName], levelUpsMinPart);
        levelsMin += index + 1;
    }
    pointsMin = levelsMin * awardPoints.upgrade_levels[rankName];

    // max
    const levelUpsMaxFull = Math.floor(brewTotalXpMax / xpToRankUp);
    const levelUpsMaxPart = brewTotalXpMax - levelUpsMaxFull * xpToRankUp;

    levelsMax = levelUpsMaxFull * levelsCount;
    if (levelUpsMaxPart > 0) {
        const index = findLevelIndex(experienceToNextLevel[rankName], levelUpsMaxPart);
        levelsMax += index + 1;
    }
    pointsMax = levelsMax * awardPoints.upgrade_levels[rankName];

    return {
        levels: { min: levelsMin, max: levelsMax },
        points: { min: pointsMin, max: pointsMax },
    }

}
