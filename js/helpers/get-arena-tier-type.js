
export default function getArenaTierType(tiersMap, tier) {
    let tierType = null;
    for (const theType in tiersMap) {
        const types = tiersMap[theType];
        if (types.includes(tier)) {
            tierType = theType;
            break;
        }
    }
    return tierType;
}