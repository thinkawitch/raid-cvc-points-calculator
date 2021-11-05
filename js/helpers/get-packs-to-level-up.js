
// get number of packs, 3 heroes per pack
export default function getPacksToLevelUp(heroes) {
    if (heroes <= 0) return 0;
    if (heroes % 3 === 0)  return heroes / 3;

    const ceiled = 3.0 * Math.ceil(heroes / 3.0);
    return ceiled / 3;
}
