import { beatStagesToLevelUp } from '../../config.js';
import getPacksToLevelUp from '../../helpers/get-packs-to-level-up.js';

export default function actionR5ChickensToPoints(newState, appendType) {
    //console.log('appendChickensLevelUpsToPoints', appendType)
    const stateNode = newState.scenarios.prepare_r5_chickens;
    const countBeatStages = beatStagesToLevelUp.brutal_12_6;

    const cfgToAppend = {
        rank_1: {
            champs_up: 'r1_10',
            champs_food: 'r1_1',
            get_type: 'common',
            levels_up: 10-1,
            upgrade_to: 'rank_2',
        },
        rank_2: {
            champs_up: 'r2_20',
            champs_food: 'r2_1',
            get_type: 'uncommon',
            levels_up: 20-1,
            upgrade_to: 'rank_3',
        },
        rank_3: {
            champs_up: 'r3_30',
            champs_food: 'r3_1',
            get_type: 'rare',
            levels_up: 30-1,
            upgrade_to: 'rank_4',
        },
        rank_4: {
            champs_up: 'r4_40',
            champs_food: 'r4_1',
            get_type: 'epic',
            levels_up: 40-1,
            upgrade_to: 'rank_5',
        },
    }

    const doPlusMin = rankName => {
        const cfg = cfgToAppend[rankName];
        const champsUp = stateNode[cfg.champs_up];
        if (champsUp) {
            newState.inputs.champion_objectives.upgrade_levels[rankName] += champsUp * cfg.levels_up;
            newState.inputs.stages_objectives.campaign_stages.brutal += getPacksToLevelUp(champsUp) * countBeatStages[rankName];
        }
    }
    const doMinusMin = rankName => {
        const cfg = cfgToAppend[rankName];
        const champsUp = stateNode[cfg.champs_up];
        if (champsUp) {
            newState.inputs.champion_objectives.upgrade_levels[rankName] -= champsUp * cfg.levels_up;
            newState.inputs.stages_objectives.campaign_stages.brutal -= getPacksToLevelUp(champsUp) * countBeatStages[rankName];
        }
    }
    const doPlusMax = rankName => {
        const cfg = cfgToAppend[rankName];
        const champsUp = stateNode[cfg.champs_up];
        const champsFood = stateNode[cfg.champs_food];
        if (champsFood) {
            newState.inputs.champion_objectives.get_champions[cfg.get_type] += champsFood;
        }
        if (champsUp) {
            newState.inputs.champion_objectives.get_champions[cfg.get_type] += champsUp;
            newState.inputs.champion_objectives.upgrade_ranks[cfg.upgrade_to] += champsUp;
        }
    }
    const doMinusMax = rankName => {
        const cfg = cfgToAppend[rankName];
        const champsUp = stateNode[cfg.champs_up];
        const champsFood = stateNode[cfg.champs_food];
        if (champsFood) {
            newState.inputs.champion_objectives.get_champions[cfg.get_type] -= champsFood;
        }
        if (champsUp) {
            newState.inputs.champion_objectives.get_champions[cfg.get_type] -= champsUp;
            newState.inputs.champion_objectives.upgrade_ranks[cfg.upgrade_to] -= champsUp;
        }
    }

    const funcs = {
        plus_r1_min: () => {
            doPlusMin('rank_1');
        },
        minus_r1_min: () => {
            doMinusMin('rank_1');
        },
        plus_r1_max: () => {
            doPlusMin('rank_1');
            doPlusMax('rank_1');
        },
        minus_r1_max: () => {
            doMinusMin('rank_1');
            doMinusMax('rank_1');
        },
        //
        plus_r2_min: () => {
            doPlusMin('rank_2');
        },
        minus_r2_min: () => {
            doMinusMin('rank_2');
        },
        plus_r2_max: () => {
            doPlusMin('rank_2');
            doPlusMax('rank_2');
        },
        minus_r2_max: () => {
            doMinusMin('rank_2');
            doMinusMax('rank_2');
        },
        //
        plus_r3_min: () => {
            doPlusMin('rank_3');
        },
        minus_r3_min: () => {
            doMinusMin('rank_3');
        },
        plus_r3_max: () => {
            doPlusMin('rank_3');
            doPlusMax('rank_3');
        },
        minus_r3_max: () => {
            doMinusMin('rank_3');
            doMinusMax('rank_3');
        },
        //
        plus_r4_min: () => {
            doPlusMin('rank_4');
        },
        minus_r4_min: () => {
            doMinusMin('rank_4');
        },
        plus_r4_max: () => {
            doPlusMin('rank_4');
            doPlusMax('rank_4');
        },
        minus_r4_max: () => {
            doMinusMin('rank_4');
            doMinusMax('rank_4');
        },
    }
    funcs[appendType]();


    // fix negative values

    const node1 = newState.inputs.champion_objectives;
    const types1 = ['get_champions', 'upgrade_levels', 'upgrade_ranks'];
    types1.forEach(type => {
        for (const key in node1[type]) {
            if (node1[type][key] < 0) {
                node1[type][key] = 0;
            }
        }
    });

    const node2 = newState.inputs.stages_objectives;
    const types2 = ['campaign_stages'];
    types2.forEach(type => {
        for (const key in node2[type]) {
            if (node2[type][key] < 0) {
                node2[type][key] = 0;
            }
        }
    });
}
