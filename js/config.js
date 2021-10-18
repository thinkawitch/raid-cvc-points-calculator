
const awardPoints = {
    get_champions: {
        common: 1,
        uncommon: 2,
        rare: 150,
        epic: 1000,
        legendary: 10000,
    },
    get_champions_first: {
        common: 10,
        uncommon: 20,
        rare: 1000,
        epic: 3000,
        legendary: 20000,
    },
    upgrade_levels: {
        rank_1: 1,
        rank_2: 2,
        rank_3: 5,
        rank_4: 10,
        rank_5: 20,
        rank_6: 40,
    },
    upgrade_ranks: {
        rank_2: 10,
        rank_3: 20,
        rank_4: 100,
        rank_5: 500,
        rank_6: 1000,
    },
    ascend_champions: {
        uncommon_1: 1,
        uncommon_2: 2,
        uncommon_3: 5,
        uncommon_4: 10,
        uncommon_5: 15,
        uncommon_6: 20,
        rare_1: 5,
        rare_2: 10,
        rare_3: 15,
        rare_4: 20,
        rare_5: 25,
        rare_6: 50,
        epic_1: 10,
        epic_2: 20,
        epic_3: 50,
        epic_4: 100,
        epic_5: 200,
        epic_6: 500,
        legendary_1: 50,
        legendary_2: 100,
        legendary_3: 250,
        legendary_4: 500,
        legendary_5: 1000,
        legendary_6: 2500,
    },
    upgrade_skills: {
        common: 10,
        uncommon: 20,
        rare: 500,
        epic: 1000,
        legendary: 3000,
    },
    great_hall: {
        level_1: 100,
        level_2: 200,
        level_3: 500,
        level_4: 750,
        level_5: 1000,
        level_6: 1500,
        level_7: 2000,
        level_8: 2500,
        level_9: 3500,
        level_10: 5000,
    },
    beat_stages: {
        normal: 10,
        hard: 20,
        brutal: 40,
        nightmare: 80,
    },
}

const championTypes = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

const championRanks = [1, 2, 3, 4, 5, 6];

const stageLevels = ['normal', 'hard', 'brutal', 'nightmare'];

export { awardPoints, championTypes, championRanks, stageLevels };
