import getLevelsPointsForBrew from '../../helpers/get-levels-points-brew.js';

export default function actionBrewPrepare(newState) {
    const brewCount = parseInt(newState.inputs.scenarios.drink_brew) || 0;

    const result = newState.scenarios.drink_brew;
    for (let i=1; i<=6; i++) {
        const rankName = 'rank_'+i;
        const levelsCount = i * 10 - 1; // levels start with 1
        const data = getLevelsPointsForBrew(brewCount, rankName, levelsCount);
        result[`r${i}_levels_min`] = data.levels.min;
        result[`r${i}_levels_max`] = data.levels.max;
        result[`r${i}_points_min`] = data.points.min;
        result[`r${i}_points_max`] = data.points.max;
    }
}
