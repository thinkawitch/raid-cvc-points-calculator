import { html, useContext } from '../../imports.js';
import { AppContext } from '../../app-context.js';
import Select from '../select.js';

const arenaOptions = [
    { value: 'gold_3', name: 'gold 3' },
    { value: 'gold_4', name: 'gold 4' },
    { value: 'gold_5', name: 'gold 5' },
    { value: 'platinum', name: 'platinum' },
];

const tagTeamOptions = [
    { value: 'bronze_1', name: 'bronze 1' },
    { value: 'bronze_2', name: 'bronze 2' },
    { value: 'bronze_3', name: 'bronze 3' },
    { value: 'bronze_4', name: 'bronze 4' },
    { value: 'silver_1', name: 'silver 1' },
    { value: 'silver_2', name: 'silver 2' },
    { value: 'silver_3', name: 'silver 3' },
    { value: 'silver_4', name: 'silver 4' },
    { value: 'gold_1', name: 'gold 1' },
    { value: 'gold_2', name: 'gold 2' },
    { value: 'gold_3', name: 'gold 3' },
    { value: 'gold_4', name: 'gold 4' },
];

export default function regularPoints() {
    const { state, updateState } = useContext(AppContext);
    const points = new Intl.NumberFormat().format(state.scenarios.regular_points);

    const setRpArenaValue = value => updateState({ type: 'regular_points_prepare', arena_tier: value });
    const arenaTier = state.inputs.scenarios.regular_points.arena_tier;

    const setRpTagTeamValue = value => updateState({ type: 'regular_points_prepare', tag_team_tier: value });
    const tagTeamTier = state.inputs.scenarios.regular_points.tag_team_tier;

    const appendToPoints = type => updateState({ type: 'regular_points_set', value: type });

    return html`
        <div>
            <div class="d-flex flex-wrap">
                <div class="me-1 mb-1">
                    Arena tear 
                    <${Select} name="arena_tier" value=${arenaTier} update=${setRpArenaValue} options=${arenaOptions} />
                </div>
                <div class="me-1 mb-1">
                    Tag team tear
                    <${Select} name="tag_team_tier" value=${tagTeamTier} update=${setRpTagTeamValue} options=${tagTeamOptions} />
                </div>
            </div>
            <div class="d-flex flex-wrap align-items-center">
                <div class="me-1">${points} points</div>
                <button class="btn btn-sm btn-secondary me-1" onClick=${() => appendToPoints('plus_regular_points')}>+ append</button>
                <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_regular_points')}>- remove</button>
            </div>
            <div class="d-flex flex-wrap small mt-1">
                <div class="me-1">3 days includes: </div>
                <div class="me-1">45 classic arena wins, </div>
                <div class="me-1">60 tag team arena wins, </div>
                <div class="me-1">2 days 2x(6,5,4) demon lord chests,</div>
                <div>3 days 2x(4x21+9) faction crypts.</div>
            </div>
        </div>
    `;
}
