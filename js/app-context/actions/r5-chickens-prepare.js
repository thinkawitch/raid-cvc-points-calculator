import { awardPoints, beatStagesToLevelUp } from '../../config.js';
import getPacksToLevelUp from '../../helpers/get-packs-to-level-up.js';


export default function actionR5ChickensPrepare(newState) {
    const targetR5 = parseInt(newState.inputs.scenarios.prepare_r5_chickens) || 0;
    const stateNode = newState.scenarios.prepare_r5_chickens;
    const energyNormal = 4;
    const energyHard = 6;
    const energyBrutal = 8;
    const energyToBeatStage = energyBrutal;
    const countBeatStages = beatStagesToLevelUp.brutal_12_6;

    let energy, energy_r1_10, energy_r2_20, energy_r3_30, energy_r4_40;
    let r1_10 = 0, r1_1 = 0,
        r2_20 = 0, r2_1 = 0,
        r3_30 = 0, r3_1 = 0,
        r4_40 = 0, r4_1 = 0;
    let points_1_min = 0, points_1_max = 0,
        points_2_min = 0, points_2_max = 0,
        points_3_min = 0, points_3_max = 0,
        points_4_min = 0, points_4_max = 0;

    r4_40 = targetR5;
    r4_1 = r4_40 * 4;

    r3_30 = r4_40 + r4_1;
    r3_1 = r3_30 * 3;

    r2_20 = r3_30 + r3_1;
    r2_1 = r2_20 * 2;

    r1_10 = r2_20 + r2_1;
    r1_1 = r1_10 * 1;

    /*console.log('r3_30', 12, getPacksToLevelUp(12) );
    console.log('r3_30', 13, getPacksToLevelUp(13) );
    console.log('r3_30', 11, getPacksToLevelUp(11) );*/

    energy_r1_10 = getPacksToLevelUp(r1_10) * energyToBeatStage * countBeatStages.rank_1;
    energy_r2_20 = getPacksToLevelUp(r2_20) * energyToBeatStage * countBeatStages.rank_2;
    energy_r3_30 = getPacksToLevelUp(r3_30) * energyToBeatStage * countBeatStages.rank_3;
    energy_r4_40 = getPacksToLevelUp(r4_40) * energyToBeatStage * countBeatStages.rank_4;

    energy = energy_r1_10 + energy_r2_20 + energy_r3_30 + energy_r4_40;

    stateNode.energy = energy;
    stateNode.energy_r1_10 = energy_r1_10;
    stateNode.energy_r2_20 = energy_r2_20;
    stateNode.energy_r3_30 = energy_r3_30;
    stateNode.energy_r4_40 = energy_r4_40;

    stateNode.r1_1 = r1_1;
    stateNode.r1_10 = r1_10;
    stateNode.r2_1 = r2_1;
    stateNode.r2_20 = r2_20;
    stateNode.r3_1 = r3_1;
    stateNode.r3_30 = r3_30;
    stateNode.r4_1 = r4_1;
    stateNode.r4_40 = r4_40;

    points_1_min = r1_10 * (10-1) * awardPoints.upgrade_levels.rank_1
        + getPacksToLevelUp(r1_10) * countBeatStages.rank_1 * awardPoints.campaign_stages.brutal;
    points_1_max = points_1_min
        + r1_10 * awardPoints.get_champions.common
        + r1_10 * awardPoints.upgrade_ranks.rank_2
        + r1_1 * awardPoints.get_champions.common;

    points_2_min = r2_20 * (20-1) * awardPoints.upgrade_levels.rank_2
        + getPacksToLevelUp(r2_20) * countBeatStages.rank_2 * awardPoints.campaign_stages.brutal;
    points_2_max = points_2_min
        + r2_20 * awardPoints.get_champions.uncommon
        + r2_20 * awardPoints.upgrade_ranks.rank_3
        + r2_1 * awardPoints.get_champions.uncommon;

    points_3_min = r3_30 * (30-1) * awardPoints.upgrade_levels.rank_3
        + getPacksToLevelUp(r3_30) * countBeatStages.rank_3 * awardPoints.campaign_stages.brutal;
    points_3_max = points_3_min
        + r3_30 * awardPoints.get_champions.rare
        + r3_30 * awardPoints.upgrade_ranks.rank_4
        + r3_1 * awardPoints.get_champions.rare;

    points_4_min = r4_40 * (40-1) * awardPoints.upgrade_levels.rank_4
        + getPacksToLevelUp(r4_40) * countBeatStages.rank_4 * awardPoints.campaign_stages.brutal;
    points_4_max = points_4_min
        + r4_40 * awardPoints.get_champions.epic
        + r4_40 * awardPoints.upgrade_ranks.rank_5
        + r4_1 * awardPoints.get_champions.epic;

    stateNode.points_1_min = points_1_min;
    stateNode.points_1_max = points_1_max;
    stateNode.points_2_min = points_2_min;
    stateNode.points_2_max = points_2_max;
    stateNode.points_3_min = points_3_min;
    stateNode.points_3_max = points_3_max;
    stateNode.points_4_min = points_4_min;
    stateNode.points_4_max = points_4_max;
}
