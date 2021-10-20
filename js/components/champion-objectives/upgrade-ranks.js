import { html, useContext } from '../../imports.js';
import { AppContext, prepareUpdate } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function upgradeRanks() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareUpdate('inputs.champion_objectives.upgrade_ranks.', updateState);
    const local = state.inputs.champion_objectives.upgrade_ranks;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.upgrade_ranks);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Upgrade ranks</h4>
            <span class="fs-5">${points}</span>
        </div>
        <div class="row align-items-center mt-1 d-none d-md-block">
            <div class="col-7">
            </div>
            <div class="col-5">
                <input type="number" class="form-control invisible" />
            </div>
        </div>
        <${NumberInput} id="f-upgrade-to-rank-2" name="rank_2" label="upgrade to rank 2" value=${local.rank_2} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-to-rank-3" name="rank_3" label="upgrade to rank 3" value=${local.rank_3} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-to-rank-4" name="rank_4" label="upgrade to rank 4" value=${local.rank_4} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-to-rank-5" name="rank_5" label="upgrade to rank 5" value=${local.rank_5} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-to-rank-6" name="rank_6" label="upgrade to rank 6" value=${local.rank_6} update=${setNewValue} />
    `;
}
