import { html, createContext, useReducer } from './imports.js';
import {
    storageKey,
    awardPoints,
} from './config.js';

export const AppContext = createContext();

//const reducer = (state, pair) => ({ ...state, ...pair })

const localStorageAvailable = storageAvailable('localStorage');

const reducer = (state, action) => {
    //console.log('pair', pair)
    if (!action || !(action.path || action.clear))  {
        console.warn('reducer unknown action', action);
        // do nothing if update have no specific data
        return state;
    }

    let newState;

    // update one property by full path
    if (action.path) {
        //console.log('action set by path')
        newState = {...state};
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
    },
    layout: {
        accordion_items_collapsed: {
            //
        },
    },
}


let loadedState = {};
if (localStorageAvailable) {
    const val = localStorage.getItem(storageKey);
    if (val) {
        loadedState = JSON.parse(val);
    }
    console.log('loadedState', loadedState);
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
