import { html, createContext, useReducer } from './imports.js';
import {
    storageKey,
    awardPoints,
    beatStagesToLevelUp,
} from './config.js';

export const AppContext = createContext();

//const reducer = (state, pair) => ({ ...state, ...pair })

const localStorageAvailable = storageAvailable('localStorage');

const allowedActions = ['path', 'clear', 'prepare_r5_chickens', 'append_chickens_to_points'];

function isActionAllowed(action) {
    if (!action) return false;
    return allowedActions.some(name => action.hasOwnProperty(name));
}

const reducer = (state, action) => {
    //console.log('reducer action', action)
    if (!isActionAllowed(action)) {
        console.warn('reducer unknown action', action);
        return state;
    }

    let newState = state; // get old one - just in case

    // update one property by full path
    if (action.path) {
        //console.log('action set by path')
        newState = clone(state);
        setObjectProperty(newState, action.path, action.value);
        calculatePoints(newState);
    }

    // reset to default
    if (action.clear) {
        //console.log('action clear')
        if (localStorageAvailable) {
            localStorage.clear(); // clear all data, delete obsolete states too
        }
        newState = clone(initialState); // deep cloning, may be replace with func returning the initial state
        newState.layout = clone(state.layout); // keep layout
    }

    // prepare r5 chickens
    if (action.prepare_r5_chickens) {
        //console.log('action prepare_r5_chickens');
        newState = clone(state);
        let r5 = parseInt(action.value) || 0;
        if (r5 < 0) r5 = 0;
        if (r5 > 99) r5 = 99;
        newState.inputs.plans_resources.prepare_r5_chickens = r5;
        prepareR5Chickens(newState);
    }

    if (action.append_chickens_to_points) {
        //console.log('action append_chickens_to_points');
        newState = clone(state);
        appendChickensLevelUpsToPoints(newState, action.value);
        calculatePoints(newState);
    }

    // save to storage
    if (localStorageAvailable) {
        localStorage.setItem(storageKey, JSON.stringify(newState));
    }

    return newState;
}

function calculatePoints(newState) {
    // count points
    let totalPoints = 0;
    let sectionPoints, groupPoints;

    for (const section in initialState.points.subtotals) {
        sectionPoints = 0;
        for (const group in initialState.points[section]) {
            groupPoints = 0;
            for (const key in newState.inputs[section][group]) {
                groupPoints += newState.inputs[section][group][key] * awardPoints[group][key];
            }
            newState.points[section][group] = groupPoints;
            sectionPoints += groupPoints;
        }
        newState.points.subtotals[section] = sectionPoints;
        totalPoints += sectionPoints;
    }

    newState.points.total = totalPoints;
}

function prepareR5Chickens(newState) {
    const targetR5 = parseInt(newState.inputs.plans_resources.prepare_r5_chickens) || 0;
    const stateNode = newState.plans_resources.prepare_r5_chickens;
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

    points_1_min = r1_10 * 10 * awardPoints.upgrade_levels.rank_1
        + getPacksToLevelUp(r1_10) * countBeatStages.rank_1 * awardPoints.campaign_stages.brutal;
    points_1_max = points_1_min
        + r1_10 * awardPoints.get_champions.common
        + r1_10 * awardPoints.upgrade_ranks.rank_2
        + r1_1 * awardPoints.get_champions.common;

    points_2_min = r2_20 * 20 * awardPoints.upgrade_levels.rank_2
        + getPacksToLevelUp(r2_20) * countBeatStages.rank_2 * awardPoints.campaign_stages.brutal;
    points_2_max = points_2_min
        + r2_20 * awardPoints.get_champions.uncommon
        + r2_20 * awardPoints.upgrade_ranks.rank_3
        + r2_1 * awardPoints.get_champions.uncommon;

    points_3_min = r3_30 * 30 * awardPoints.upgrade_levels.rank_3
        + getPacksToLevelUp(r3_30) * countBeatStages.rank_3 * awardPoints.campaign_stages.brutal;
    points_3_max = points_3_min
        + r3_30 * awardPoints.get_champions.rare
        + r3_30 * awardPoints.upgrade_ranks.rank_4
        + r3_1 * awardPoints.get_champions.rare;

    points_4_min = r4_40 * 40 * awardPoints.upgrade_levels.rank_4
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

function appendChickensLevelUpsToPoints(newState, appendType) {
    //console.log('appendChickensLevelUpsToPoints', appendType)
    const stateNode = newState.plans_resources.prepare_r5_chickens;
    const countBeatStages = beatStagesToLevelUp.brutal_12_6;

    const cfgToAppend = {
        rank_1: {
            champs_up: 'r1_10',
            champs_food: 'r1_1',
            get_type: 'common',
            levels_up: 10,
            upgrade_to: 'rank_2',
        },
        rank_2: {
            champs_up: 'r2_20',
            champs_food: 'r2_1',
            get_type: 'uncommon',
            levels_up: 20,
            upgrade_to: 'rank_3',
        },
        rank_3: {
            champs_up: 'r3_30',
            champs_food: 'r3_1',
            get_type: 'rare',
            levels_up: 30,
            upgrade_to: 'rank_4',
        },
        rank_4: {
            champs_up: 'r4_40',
            champs_food: 'r4_1',
            get_type: 'epic',
            levels_up: 40,
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

function getPacksToLevelUp(heroes) {
    if (heroes <= 0) return 0;
    if (heroes % 3 === 0)  return heroes / 3;

    const ceiled = 3.0 * Math.ceil(heroes / 3.0);
    return ceiled / 3;
}

const initialState = {
    points: {
        champion_objectives: {
            get_champions: 0,
            get_champions_first: 0,
            upgrade_levels: 0,
            upgrade_ranks: 0,
            ascend_champions: 0,
            upgrade_skills: 0,
            great_hall: 0,
        },
        stages_objectives: {
            campaign_stages: 0,
            potion_keep_stages: 0,
            minotaur_stages: 0,
            dragon_stages: 0,
            ice_golem_stages: 0,
            fire_knight_stages: 0,
            spider_stages: 0,
        },
        faction_wars_objectives: {
            faction_wars_stages: 0,
        },
        arena_objectives: {
            classic_arena: 0,
            tag_team_arena: 0,
        },
        clan_boss_objectives: {
          clan_boss_chests: 0,
        },
        gear_objectives: {
            use_glyphs: 0,
            upgrade_artifacts: 0,
        },
        forge_objectives: {
            craft_artifacts: 0,
        },
        misc_objectives: {
            use_gems: 0,
        },
        subtotals: {
            champion_objectives: 0,
            stages_objectives: 0,
            faction_wars_objectives: 0,
            arena_objectives: 0,
            clan_boss_objectives: 0,
            gear_objectives: 0,
            forge_objectives: 0,
            misc_objectives: 0,
        },
        total: 0,
    },
    inputs: {
        champion_objectives: {
            get_champions: {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
            },
            get_champions_first: {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
            },
            upgrade_levels: {
                rank_1: 0,
                rank_2: 0,
                rank_3: 0,
                rank_4: 0,
                rank_5: 0,
                rank_6: 0,
            },
            upgrade_ranks: {
                rank_2: 0,
                rank_3: 0,
                rank_4: 0,
                rank_5: 0,
                rank_6: 0,
            },
            ascend_champions: {
                uncommon_1: 0,
                uncommon_2: 0,
                uncommon_3: 0,
                uncommon_4: 0,
                uncommon_5: 0,
                uncommon_6: 0,
                rare_1: 0,
                rare_2: 0,
                rare_3: 0,
                rare_4: 0,
                rare_5: 0,
                rare_6: 0,
                epic_1: 0,
                epic_2: 0,
                epic_3: 0,
                epic_4: 0,
                epic_5: 0,
                epic_6: 0,
                legendary_1: 0,
                legendary_2: 0,
                legendary_3: 0,
                legendary_4: 0,
                legendary_5: 0,
                legendary_6: 0,
            },
            upgrade_skills: {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
            },
            great_hall: {
                level_1: 0,
                level_2: 0,
                level_3: 0,
                level_4: 0,
                level_5: 0,
                level_6: 0,
                level_7: 0,
                level_8: 0,
                level_9: 0,
                level_10: 0,
            },
        },
        stages_objectives: {
            campaign_stages: {
                normal: 0,
                hard: 0,
                brutal: 0,
                nightmare: 0,
            },
            potion_keep_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_20: 0,
            },
            minotaur_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
            },
            dragon_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_19: 0,
                stage_20_24: 0,
                stage_25: 0,
            },
            ice_golem_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_19: 0,
                stage_20_24: 0,
                stage_25: 0,
            },
            fire_knight_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_19: 0,
                stage_20_24: 0,
                stage_25: 0,
            },
            spider_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_19: 0,
                stage_20_24: 0,
                stage_25: 0,
            },
        },
        faction_wars_objectives: {
            faction_wars_stages: {
                stage_1_5: 0,
                stage_6_10: 0,
                stage_11_15: 0,
                stage_16_20: 0,
                stage_21: 0,
            },
        },
        arena_objectives: {
            classic_arena: {
                bronze_medal: 0,
                silver_medal: 0,
                gold_medal: 0,
            },
            tag_team_arena: {
                gold_bars: 0,
            },
        },
        clan_boss_objectives: {
            clan_boss_chests: {
                novice: 0,
                adept: 0,
                warrior: 0,
                knight: 0,
                guardian: 0,
                master: 0,
                grandmaster: 0,
                ultimate: 0,
                mythical: 0,
                divine: 0,
                celestial: 0,
                transcendent: 0,
            },
        },
        gear_objectives: {
            use_glyphs: {
                rank_1: 0,
                rank_2: 0,
                rank_3: 0,
                rank_4: 0,
                rank_5: 0,
                rank_6: 0,
            },
            upgrade_artifacts: {
                rank_1_3_level_4: 0,
                rank_1_3_level_8: 0,
                rank_1_3_level_12: 0,
                rank_1_3_level_16: 0,
                rank_4_5_level_4: 0,
                rank_4_5_level_8: 0,
                rank_4_5_level_12: 0,
                rank_4_5_level_16: 0,
                rank_6_level_4: 0,
                rank_6_level_8: 0,
                rank_6_level_12: 0,
                rank_6_level_16: 0,
            },
        },
        forge_objectives: {
            craft_artifacts: {
                rare_rank_3: 0,
                rare_rank_4: 0,
                rare_rank_5: 0,
                rare_rank_6: 0,
                epic_rank_3: 0,
                epic_rank_4: 0,
                epic_rank_5: 0,
                epic_rank_6: 0,
                legendary_rank_3: 0,
                legendary_rank_4: 0,
                legendary_rank_5: 0,
                legendary_rank_6: 0,
            },
        },
        misc_objectives: {
            use_gems: {
                gem: 0,
            }
        },
        plans_resources: {
            prepare_r5_chickens: 0,
        },
    },
    plans_resources: {
        prepare_r5_chickens: {
            energy: 0,
            energy_r1_10: 0,
            energy_r2_20: 0,
            energy_r3_30: 0,
            energy_r4_40: 0,
            beat_stages_r1_10: 0,
            beat_stages_r2_20: 0,
            beat_stages_r3_30: 0,
            beat_stages_r4_40: 0,
            r1_1: 0,
            r1_10: 0,
            r2_1: 0,
            r2_20: 0,
            r3_1: 0,
            r3_30: 0,
            r4_1: 0,
            r4_40: 0,
            points_1_min: 0,
            points_1_max: 0,
            points_2_min: 0,
            points_2_max: 0,
            points_3_min: 0,
            points_3_max: 0,
            points_4_min: 0,
            points_4_max: 0,
        },
    },
    layout: {
        accordion_items_collapsed: {
            'accordion-item-1': true,
            'accordion-item-2': true,
            'accordion-item-3': true,
            'accordion-item-4': true,
            'accordion-item-5': true,
            'accordion-item-6': true,
            'accordion-item-7': true,
            'accordion-item-8': true,
        },
    },
}


let loadedState = {};
if (localStorageAvailable) {
    const val = localStorage.getItem(storageKey);
    if (val) {
        try {
            loadedState = JSON.parse(val);
        } catch (e) {
            console.error(e);
        }
    }
    //console.log('loadedState', loadedState);
}

// deep cloning
const startState = {...clone(initialState), ...loadedState};


export const prepareStateUpdateWithPath = (prefix, updateState) => {
    return (name, value) => {
        //console.log('call updateState', prefix, name, value);
        updateState({ path: prefix + name, value });
    }
}

export function AppProvider({ children }) {
    const [state, updateState] = useReducer(reducer, startState);
    return html`
        <${AppContext.Provider} value=${{ state, updateState }}>
            ${children}
        <//>
    `;
}


// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// https://dirask.com/posts/JavaScript-set-object-property-by-path-DNKXOp
const setObjectProperty = (object, path, value) => {
    const parts = path.split('.');
    const limit = parts.length - 1;
    for (let i = 0; i < limit; ++i) {
        const key = parts[i];
        object = object[key] ?? (object[key] = { });
    }
    const key = parts[limit];
    object[key] = value;
};

// https://github.com/angus-c/just/blob/master/packages/collection-clone/index.js
function clone(obj) {
    if (typeof obj == 'function') {
        return obj;
    }
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        // include prototype properties
        var value = obj[key];
        var type = {}.toString.call(value).slice(8, -1);
        if (type == 'Array' || type == 'Object') {
            result[key] = clone(value);
        } else if (type == 'Date') {
            result[key] = new Date(value.getTime());
        } else if (type == 'RegExp') {
            result[key] = RegExp(value.source, getRegExpFlags(value));
        } else {
            result[key] = value;
        }
    }
    return result;
}
function getRegExpFlags(regExp) {
    if (typeof regExp.source.flags == 'string') {
        return regExp.source.flags;
    } else {
        var flags = [];
        regExp.global && flags.push('g');
        regExp.ignoreCase && flags.push('i');
        regExp.multiline && flags.push('m');
        regExp.sticky && flags.push('y');
        regExp.unicode && flags.push('u');
        return flags.join('');
    }
}
