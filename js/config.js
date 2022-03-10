
const storageKey = 'calculator-state-v3'; // update before publishing new version

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
    campaign_stages: {
        normal: 10,
        hard: 20,
        brutal: 40,
        nightmare: 80,
    },
    potion_keep_stages: {
        stage_1_5: 10,
        stage_6_10: 20,
        stage_11_15: 40,
        stage_16_20: 80,
    },
    minotaur_stages: {
        stage_1_5: 10,
        stage_6_10: 30,
        stage_11_15: 80,
    },
    dragon_stages: {
        stage_1_5: 5,
        stage_6_10: 10,
        stage_11_15: 20,
        stage_16_19: 30,
        stage_20_24: 100,
        stage_25: 150,
        stage_hard_1_9: 175,
        stage_hard_10: 200,
    },
    ice_golem_stages: {
        stage_1_5: 10,
        stage_6_10: 20,
        stage_11_15: 40,
        stage_16_19: 100,
        stage_20_24: 200,
        stage_25: 300,
        stage_hard_1_9: 350,
        stage_hard_10: 400,
    },
    fire_knight_stages: {
        stage_1_5: 10,
        stage_6_10: 20,
        stage_11_15: 40,
        stage_16_19: 100,
        stage_20_24: 200,
        stage_25: 300,
        stage_hard_1_9: 350,
        stage_hard_10: 400,
    },
    spider_stages: {
        stage_1_5: 10,
        stage_6_10: 20,
        stage_11_15: 40,
        stage_16_19: 100,
        stage_20_24: 200,
        stage_25: 300,
        stage_hard_1_9: 350,
        stage_hard_10: 400,
    },
    faction_wars_stages: {
        stage_1_5: 50,
        stage_6_10: 100,
        stage_11_15: 200,
        stage_16_20: 500,
        stage_21: 1000,
    },
    classic_arena: {
        bronze_medal: 5,
        silver_medal: 10,
        gold_medal: 20,
    },
    tag_team_arena: {
        gold_bars: 5,
    },
    clan_boss_chests: {
        novice: 10,
        adept: 20,
        warrior: 30,
        knight: 80,
        guardian: 90,
        master: 100,
        grandmaster: 300,
        ultimate: 400,
        mythical: 500,
        divine: 800,
        celestial: 900,
        transcendent: 1000,
    },
    use_glyphs: {
        rank_1: 5,
        rank_2: 10,
        rank_3: 20,
        rank_4: 50,
        rank_5: 100,
        rank_6: 500,
    },
    upgrade_artifacts: {
        rank_1_3_level_4: 10,
        rank_1_3_level_8: 20,
        rank_1_3_level_12: 100,
        rank_1_3_level_16: 500,
        rank_4_5_level_4: 20,
        rank_4_5_level_8: 40,
        rank_4_5_level_12: 200,
        rank_4_5_level_16: 1000,
        rank_6_level_4: 30,
        rank_6_level_8: 60,
        rank_6_level_12: 300,
        rank_6_level_16: 1500,
    },
    craft_artifacts: {
        rare_rank_3: 5,
        rare_rank_4: 10,
        rare_rank_5: 20,
        rare_rank_6: 50,
        epic_rank_3: 10,
        epic_rank_4: 20,
        epic_rank_5: 50,
        epic_rank_6: 100,
        legendary_rank_3: 50,
        legendary_rank_4: 100,
        legendary_rank_5: 200,
        legendary_rank_6: 500,
    },
    use_gems: {
        gem: 1,
    }
}

const championTypes = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

const championRanks = [1, 2, 3, 4, 5, 6];

const campaignLevels = ['normal', 'hard', 'brutal', 'nightmare'];

const stagesIntervalsPotions = ['stage_1_5', 'stage_6_10', 'stage_11_15', 'stage_16_20'];
const stagesIntervalsDungeonBosses = ['stage_1_5', 'stage_6_10', 'stage_11_15', 'stage_16_19', 'stage_20_24', 'stage_25'];
const stagesIntervalsFactionWars = ['stage_1_5', 'stage_6_10', 'stage_11_15', 'stage_16_20', 'stage_21'];

const clanBossChests = [
    'novice', 'adept', 'warrior', 'knight', 'guardian', 'master', 'grandmaster',
    'ultimate', 'mythical', 'divine', 'celestial', 'transcendent',
];


const beatStagesToLevelUp = {
    brutal_12_3: {

    },
    brutal_12_6: {
        rank_1: 3,
        rank_2: 10,
        rank_3: 23,
        rank_4: 52,
        rank_5: 110,
        rank_6: 229,
    },
}

// https://ayumilove.net/raid-shadow-legends-champion-leveling-guide/
const experienceToNextLevel = {
    rank_1: [897, 1118, 1393, 1736, 2163, 2695, 3359, 4185, 5215], // level 1 -> 9
    rank_2: [1110, 1258, 1426, 1616, 1831, 2075, 2351, 2664, 3019, 3421, 3876, 4392, 4977, 5640, 6390, 7241, 8205, 9298, 10536], // 1-19
    rank_3: [1279, 1411, 1556, 1717, 1893, 2088, 2303, 2541, 2802, 3091, 3409, 3760, 4147, 4574, 5045, 5565, 6138, 6769, 7466,
        8235, 9083, 10018, 11050, 12188, 13442, 14827, 16353, 18037, 19894
    ], // 1-29
    rank_4: [1460, 1591, 1734, 1890, 2060, 2245, 2447, 2666, 2906, 3167, 3451, 3761, 4099, 4467, 4868, 5305, 5782, 6301, 6867,
        7483, 8155, 8888, 9686, 10556, 11504, 12537, 13663, 14890, 16227, 17684, 19272, 21003, 22889, 24945, 27185, 29627,
        32287, 35187, 38347
    ], // 1-39
    rank_5: [1625, 1760, 1907, 2066, 2238, 2424, 2626, 2845, 3082, 3338, 3616, 3918, 4244, 4597, 4980, 5395, 5844, 6331, 6858,
        7430, 8048, 8719, 9445, 10231, 11084, 12007, 13007, 14090, 15264, 16535, 17912, 19404, 21020, 22770, 24667, 26721,
        28947, 31358, 33970, 36799, 39864, 43184, 46780, 50677, 54897, 59470, 64423, 69788, 75601
    ], // 1-49
    rank_6: [1813, 1956, 2110, 2277, 2457, 2651, 2860, 3086, 3329, 3592, 3876, 4182, 4512, 4869, 5253, 5668, 6115, 6598, 7119,
        7681, 8288, 8942, 9648, 10410, 11232, 12119, 13076, 14109, 15223, 16425, 17722, 19121, 20631, 22260, 24018, 25914,
        27961, 30168, 32551, 35121, 37894, 40886, 44115, 47598, 51357, 55412, 59787, 64508, 69602, 75098, 81028, 87426,
        94329, 101778, 109815, 118486, 127842, 137937, 148828,
    ], // 1-59
}

const xpPerBrew = {
    good: 18750,
    bad: 12500,
}

export {
    storageKey,
    awardPoints,
    championTypes,
    championRanks,
    campaignLevels,
    stagesIntervalsPotions,
    stagesIntervalsDungeonBosses,
    stagesIntervalsFactionWars,
    clanBossChests,
    beatStagesToLevelUp,
    experienceToNextLevel,
    xpPerBrew,
};
