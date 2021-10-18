import { html, createContext, useReducer } from './imports.js';
import { awardPoints, championTypes, championRanks, stageLevels } from './config.js';

export const AppContext = createContext();

//const reducer = (state, pair) => ({ ...state, ...pair })

const reducer = (state, pair) => {
    if (!pair || !pair.path)  {
        // do noting if update have no specific data
        return state;
    }
    //console.log('reducer');
    //console.log('state', state, 'pair', pair)
    //return { ...state, ...pair };

    const newState = { ...state };
    setObjectProperty(newState, pair.path, pair.value);

    // count points
    let totalPoints = 0;
    let sectionPoints, groupPoints;

    // sections
    // champion objectives
    sectionPoints = 0;

    // get champions
    groupPoints = 0;
    championTypes.forEach(type => {
        groupPoints += newState.inputs.champion_objectives.get_champions[type] * awardPoints.get_champions[type];
    });
    newState.points.champion_objectives.get_champions = groupPoints;
    sectionPoints += groupPoints;

    // get champions first time
    groupPoints = 0;
    championTypes.forEach(type => {
        groupPoints += newState.inputs.champion_objectives.get_champions_first[type] * awardPoints.get_champions_first[type];
    });
    newState.points.champion_objectives.get_champions_first = groupPoints;
    sectionPoints += groupPoints;

    // upgrade levels
    groupPoints = 0;
    championRanks.forEach(rank => {
        groupPoints += newState.inputs.champion_objectives.upgrade_levels['rank_'+rank] * awardPoints.upgrade_levels['rank_'+rank];
    });
    newState.points.champion_objectives.upgrade_levels = groupPoints;
    sectionPoints += groupPoints;

    // upgrade ranks
    groupPoints = 0;
    championRanks.slice(1).forEach(rank => {
        groupPoints += newState.inputs.champion_objectives.upgrade_ranks['rank_'+rank] * awardPoints.upgrade_ranks['rank_'+rank];
    });
    newState.points.champion_objectives.upgrade_ranks = groupPoints;
    sectionPoints += groupPoints;

    // ascend champions
    groupPoints = 0;
    championTypes.slice(1).forEach(type => {
        championRanks.forEach(rank => {
            groupPoints += newState.inputs.champion_objectives.ascend_champions[`${type}_${rank}`] * awardPoints.ascend_champions[`${type}_${rank}`];
        });
    });
    newState.points.champion_objectives.ascend_champions = groupPoints;
    sectionPoints += groupPoints;

    // upgrade skills
    groupPoints = 0;
    championTypes.forEach(type => {
        groupPoints += newState.inputs.champion_objectives.upgrade_skills[type] * awardPoints.upgrade_skills[type];
    });
    newState.points.champion_objectives.upgrade_skills = groupPoints;
    sectionPoints += groupPoints;

    // great hall
    groupPoints = 0;
    for (let i=1; i<=10; i++) {
        groupPoints += newState.inputs.champion_objectives.great_hall['level_'+i] * awardPoints.great_hall['level_'+i];
    }
    newState.points.champion_objectives.great_hall = groupPoints;
    sectionPoints += groupPoints;

    newState.points.subtotals.champion_objectives = sectionPoints;
    totalPoints += sectionPoints;


    // campaign objectives
    sectionPoints = 0;

    // beat stages
    groupPoints = 0;
    stageLevels.forEach(level => {
        groupPoints += newState.inputs.campaign_objectives.beat_stages[level] * awardPoints.beat_stages[level];
    });
    newState.points.campaign_objectives.beat_stages = groupPoints;
    sectionPoints += groupPoints;

    newState.points.subtotals.campaign_objectives = sectionPoints;
    totalPoints += sectionPoints;

    // total
    newState.points.total = totalPoints;

    return newState;
}

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
        campaign_objectives: {
            beat_stages: 0,
        },
        subtotals: {
            champion_objectives: 0,
            campaign_objectives: 0,
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
        campaign_objectives: {
            beat_stages: {
                normal: 0,
                hard: 0,
                brutal: 0,
                nightmare: 0,
            }
        },
    },
    some_extra: 1,
}

export const prepareUpdate = (prefix, update) => {
    return (name, value) => {
        //console.log('call update', prefix, name, value);
        update({ path: prefix + name, value });
    }
}



export function AppProvider({ children }) {
    const [state, update] = useReducer(reducer, initialState);
    return html`
        <${AppContext.Provider} value=${{ state, update }}>
            ${children}
        <//>
    `;
}
