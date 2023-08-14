import getArenaTierType from '../../helpers/get-arena-tier-type.js';
import { awardPoints } from '../../config.js';

const setAdd = (a, b) => {
    a = parseInt(a);
    b = parseInt(b);
    return a + b;
}
const setRemove = (a, b) => {
    a = parseInt(a);
    b = parseInt(b);
    let result = a - b;
    if (result < 0) result = 0;
    return result;
}

export default function actionRegularPointsSet(newState, appendType) {
    const arenaTier = newState.inputs.scenarios.regular_points.arena_tier;
    const tagTeamTier = newState.inputs.scenarios.regular_points.tag_team_tier;
    let points = 0;
    const appendFunc = appendType === 'plus_regular_points' ? setAdd : setRemove;

    // classic arena: medals
    const arenaMedalsPerWin = awardPoints.classic_arena.tier_medals[arenaTier];
    const arenaTierType = getArenaTierType(awardPoints.classic_arena.tier_types, arenaTier);
    const prevMedals = newState.inputs.arena_objectives.classic_arena[arenaTierType + '_medal'];
    const newMedals = appendFunc(prevMedals, 45 * arenaMedalsPerWin);
    newState.inputs.arena_objectives.classic_arena[arenaTierType + '_medal'] = newMedals;

    // tag team: gold bars
    const tagTeamBarsPerWin = 3 * awardPoints.tag_team_arena.tier_bars[tagTeamTier];
    const tagTeamPointsPerWin = tagTeamBarsPerWin * awardPoints.tag_team_arena.gold_bars;
    const prevBars = newState.inputs.arena_objectives.tag_team_arena.gold_bars;
    const newBars = appendFunc(prevBars, 60 * tagTeamBarsPerWin);
    newState.inputs.arena_objectives.tag_team_arena.gold_bars = newBars;

    // demon lord chests
    const dlNode = newState.inputs.clan_boss_objectives.clan_boss_chests;
    dlNode.guardian = appendFunc(dlNode.guardian, 2*2);
    dlNode.grandmaster = appendFunc(dlNode.grandmaster, 2*2);
    dlNode.ultimate = appendFunc(dlNode.ultimate, 2*2);
    dlNode.transcendent = appendFunc(dlNode.transcendent, 2*2);

    // faction crypts
    const fNode = newState.inputs.faction_wars_objectives.faction_wars_stages;
    fNode.stage_6_10 = appendFunc(fNode.stage_6_10, 3 * 2 * 1);
    fNode.stage_21 = appendFunc(fNode.stage_21, 3 * 2 * 4);
}
