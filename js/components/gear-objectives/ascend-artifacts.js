import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function ascendArtifacts() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.gear_objectives.ascend_artifacts.', updateState);
    const local = state.inputs.gear_objectives.ascend_artifacts;
    const points = new Intl.NumberFormat().format(state.points.gear_objectives.ascend_artifacts);
    const viewModeFull = state.layout.view_mode.full;
    return html`
        <div class="d-flex align-items-center mt-3">
            <h4 class="flex-grow-1 m-0">Ascend artifacts & accessories</h4>
            <span class="fs-5">${points}</span>
        </div>
        <div class="row row-with-center-separator">
            ${viewModeFull && html`
            <div class="col-md-6">
                <${NumberInput} id="f-aa-r4-level-1-2" name="rank_4_level_1_2" label="r4 level 1-2" value=${local.rank_4_level_1_2} update=${setNewValue} />
                <${NumberInput} id="f-aa-r4-level-3-4" name="rank_4_level_3_4" label="r4 level 3-4" value=${local.rank_4_level_3_4} update=${setNewValue} />
            </div>
            `}
            <div class="col-md-6">
                <${NumberInput} id="f-aa-r5-level-1-2" name="rank_5_level_1_2" label="r5 level 1-2" value=${local.rank_5_level_1_2} update=${setNewValue} />
                <${NumberInput} id="f-aa-r5-level-3-4" name="rank_5_level_3_4" label="r5 level 3-4" value=${local.rank_5_level_3_4} update=${setNewValue} />
                <${NumberInput} id="f-aa-r5-level-5" name="rank_5_level_5" label="r5 level 5" value=${local.rank_5_level_5} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-aa-r6-level-1-2" name="rank_6_level_1_2" label="r6 level 1-2" value=${local.rank_6_level_1_2} update=${setNewValue} />
                <${NumberInput} id="f-aa-r6-level-3-4" name="rank_6_level_3_4" label="r6 level 3-4" value=${local.rank_6_level_3_4} update=${setNewValue} />
                <${NumberInput} id="f-aa-r6-level-5-6" name="rank_6_level_5_6" label="r6 level 5-6" value=${local.rank_6_level_5_6} update=${setNewValue} />
            </div>
        </div>
    `;
}

