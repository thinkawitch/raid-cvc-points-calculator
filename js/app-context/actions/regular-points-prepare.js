import getArenaTierType from '../../helpers/get-arena-tier-type.js';
import { awardPoints } from '../../config.js';

export default function actionRegularPointsPrepare(newState) {
    const arenaTier = newState.inputs.scenarios.regular_points.arena_tier;
    const tagTeamTier = newState.inputs.scenarios.regular_points.tag_team_tier;
    let points = 0;

    // arena
    const arenaMedalsPerWin = awardPoints.classic_arena.tier_medals[arenaTier];
    const arenaTierType = getArenaTierType(awardPoints.classic_arena.tier_types, arenaTier);
    const arenaPointsPerWin = arenaMedalsPerWin * awardPoints.classic_arena[arenaTierType + '_medal'];
    points += 45 * arenaPointsPerWin;
    // console.log('arenaTier', arenaTier)
    // console.log('arenaTierType', arenaTierType)
    // console.log('arenaMedalsPerWin', arenaMedalsPerWin)
    // console.log('arenaPointsPerWin', arenaPointsPerWin)

    // tag team
    const tagTeamBarsPerWin = 3 * awardPoints.tag_team_arena.tier_bars[tagTeamTier];
    const tagTeamPointsPerWin = tagTeamBarsPerWin * awardPoints.tag_team_arena.gold_bars;
    points += 60 * tagTeamPointsPerWin;
    // console.log('tagTeamTier', tagTeamTier)
    // console.log('tagTeamBarsPerWin', tagTeamBarsPerWin)
    // console.log('tagTeamPointsPerWin', tagTeamPointsPerWin)

    // demon lord
    points += 2 * 2 * (
        awardPoints.clan_boss_chests.guardian +
        awardPoints.clan_boss_chests.grandmaster +
        awardPoints.clan_boss_chests.ultimate +
        awardPoints.clan_boss_chests.transcendent
    );

    // faction crypts
    points += 3 * 2 * (
        4 * awardPoints.faction_wars_stages.stage_21
        + awardPoints.faction_wars_stages.stage_6_10
    );

    //console.log('points', points)
    newState.scenarios.regular_points = points;
}
