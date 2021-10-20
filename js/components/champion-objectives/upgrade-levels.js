import { html, useContext } from '../../imports.js';
import { AppContext, prepareUpdate } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function upgradeLevels() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareUpdate('inputs.champion_objectives.upgrade_levels.', updateState);
    const local = state.inputs.champion_objectives.upgrade_levels;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.upgrade_levels);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Upgrade levels</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-level-up-rank-1" name="rank_1" label="level-up rank 1" value=${local.rank_1} update=${setNewValue} />
        <${NumberInput} id="f-level-up-rank-2" name="rank_2" label="level-up rank 2" value=${local.rank_2} update=${setNewValue} />
        <${NumberInput} id="f-level-up-rank-3" name="rank_3" label="level-up rank 3" value=${local.rank_3} update=${setNewValue} />
        <${NumberInput} id="f-level-up-rank-4" name="rank_4" label="level-up rank 4" value=${local.rank_4} update=${setNewValue} />
        <${NumberInput} id="f-level-up-rank-5" name="rank_5" label="level-up rank 5" value=${local.rank_5} update=${setNewValue} />
        <${NumberInput} id="f-level-up-rank-6" name="rank_6" label="level-up rank 6" value=${local.rank_6} update=${setNewValue} />
    `;
}
