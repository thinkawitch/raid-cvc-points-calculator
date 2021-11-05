import { html, createContext, useReducer } from './imports.js';
import clone from './helpers/clone.js';
import actionUpdatePropertyByPath from './app-context/actions/update-by-path.js';
import actionR5ChickensPrepare from './app-context/actions/r5-chickens-prepare.js';
import actionR5ChickensToPoints from './app-context/actions/r5-chickens-to-points.js';
import actionBrewPrepare from './app-context/actions/brew-prepare.js';
import actionBrewToPoints from './app-context/actions/brew-to-points.js';
import {
    storageKey,
    awardPoints,
} from './config.js';

export const AppContext = createContext();

//const reducer = (state, pair) => ({ ...state, ...pair })

const localStorageAvailable = storageAvailable('localStorage');

const reducer = (state, action) => {
    //console.log('reducer action', action)
    let newState = state; // get old one - just in case
    let updated = true;

    switch (action.type) {
        // update one property by full path
        case 'update_by_path':
            newState = clone(state);
            actionUpdatePropertyByPath(newState, action.path, action.value);
            calculatePoints(newState);
            break;
        // reset to default
        case 'clear':
            if (localStorageAvailable) {
                localStorage.clear(); // clear all data, delete obsolete states too
            }
            newState = clone(initialState); // deep cloning, may be replace with func returning the initial state
            newState.layout = clone(state.layout); // keep layout
            break;
        // prepare r5 chickens
        case 'r5_chickens_prepare':
            newState = clone(state);
            let r5 = parseInt(action.value) || 0;
            if (r5 < 0) r5 = 0;
            if (r5 > 99) r5 = 99;
            newState.inputs.scenarios.prepare_r5_chickens = r5;
            actionR5ChickensPrepare(newState);
            break;
        // append chickens to points
        case 'r5_chickens_to_points':
            newState = clone(state);
            actionR5ChickensToPoints(newState, action.value);
            calculatePoints(newState);
            break;
        case 'brew_prepare':
            newState = clone(state);
            newState.inputs.scenarios.drink_brew = parseInt(action.value) || 0;
            actionBrewPrepare(newState);
            break;
        case 'brew_to_points':
            newState = clone(state);
            actionBrewToPoints(newState, action.value);
            calculatePoints(newState);
            break;
        default:
            updated = false;
    }

    // save to storage
    if (updated && localStorageAvailable) {
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
            },
        },
        scenarios: {
            prepare_r5_chickens: 0,
            drink_brew: 0,
        },
    },
    scenarios: {
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
        drink_brew: {
            r1_levels_min: 0,
            r1_levels_max: 0,
            r1_points_min: 0,
            r1_points_max: 0,
            r2_levels_min: 0,
            r2_levels_max: 0,
            r2_points_min: 0,
            r2_points_max: 0,
            r3_levels_min: 0,
            r3_levels_max: 0,
            r3_points_min: 0,
            r3_points_max: 0,
            r4_levels_min: 0,
            r4_levels_max: 0,
            r4_points_min: 0,
            r4_points_max: 0,
            r5_levels_min: 0,
            r5_levels_max: 0,
            r5_points_min: 0,
            r5_points_max: 0,
            r6_levels_min: 0,
            r6_levels_max: 0,
            r6_points_min: 0,
            r6_points_max: 0,
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
        scenario_items_collapsed: {
          'scenario-item-1': false,
          'scenario-item-2': true,
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
        updateState({ type: 'update_by_path', path: prefix + name, value });
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
