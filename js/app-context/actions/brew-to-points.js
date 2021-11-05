import getLevelsPointsForBrew from '../../helpers/get-levels-points-brew.js';

export default function brewToPoints(newState, appendType) {
    console.log('brewToPoints', appendType);
    const brewCount = parseInt(newState.inputs.scenarios.drink_brew) || 0;

    const getData = (rankNumber) => {
        return getLevelsPointsForBrew(brewCount, 'rank_' + rankNumber, rankNumber * 10 - 1);
    }

    const doPlusMin = rankNumber => {
        const rankName = 'rank_' + rankNumber;
        const data = getData(rankNumber);
        newState.inputs.champion_objectives.upgrade_levels[rankName] += data.levels.min;
    }
    const doMinusMin = rankNumber => {
        const rankName = 'rank_' + rankNumber;
        const data = getData(rankNumber);
        newState.inputs.champion_objectives.upgrade_levels[rankName] -= data.levels.min;
    }

    const doPlusMax = rankNumber => {
        const rankName = 'rank_' + rankNumber;
        const data = getData(rankNumber);
        newState.inputs.champion_objectives.upgrade_levels[rankName] += data.levels.max;
    }
    const doMinusMax = rankNumber => {
        const rankName = 'rank_' + rankNumber;
        const data = getData(rankNumber);
        newState.inputs.champion_objectives.upgrade_levels[rankName] -= data.levels.max;
    }

    const funcs = {
        doPlusMin, doMinusMin,
        doPlusMax, doMinusMax,
    }

    let funcName = 'do';
    const match = /^(plus|minus)_r(\d+)_(min|max)$/.exec(appendType);
    //console.log('match', match);
    if (match) {
        funcName += capitalize(match[1]) + capitalize(match[3]);
        //console.log('funcName', funcName);
        const rank = parseInt(match[2]);
        funcs[funcName](rank);
    }


    // fix negative values

    const node1 = newState.inputs.champion_objectives;
    const types1 = ['upgrade_levels'];
    types1.forEach(type => {
        for (const key in node1[type]) {
            if (node1[type][key] < 0) {
                node1[type][key] = 0;
            }
        }
    });
}


function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
