import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function upgradeArtifacts() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.gear_objectives.upgrade_artifacts.', updateState);
    const local = state.inputs.gear_objectives.upgrade_artifacts;
    const points = new Intl.NumberFormat().format(state.points.gear_objectives.upgrade_artifacts);
    return html`
        <div class="d-flex align-items-center mt-3">
            <h4 class="flex-grow-1 m-0">Upgrade artifacts & accessories</h4>
            <span class="fs-5">${points}</span>
        </div>
        <div class="row row-with-center-separator">
            <div class="col-md-6">
                <${NumberInput} id="f-artifact-r13-level-4" name="rank_1_3_level_4" label="r1-3 level 4" value=${local.rank_1_3_level_4} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r13-level-8" name="rank_1_3_level_8" label="r1-3 level 8" value=${local.rank_1_3_level_8} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r13-level-12" name="rank_1_3_level_12" label="r1-3 level 12" value=${local.rank_1_3_level_12} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r13-level-16" name="rank_1_3_level_16" label="r1-3 level 16" value=${local.rank_1_3_level_16} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-artifact-r45-level-4" name="rank_4_5_level_4" label="r4-5 level 4" value=${local.rank_4_5_level_4} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r45-level-8" name="rank_4_5_level_8" label="r4-5 level 8" value=${local.rank_4_5_level_8} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r45-level-12" name="rank_4_5_level_12" label="r4-5 level 12" value=${local.rank_4_5_level_12} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r45-level-16" name="rank_4_5_level_16" label="r4-5 level 16" value=${local.rank_4_5_level_16} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-artifact-r6-level-4" name="rank_6_level_4" label="r6 level 4" value=${local.rank_6_level_4} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r6-level-8" name="rank_6_level_8" label="r6 level 8" value=${local.rank_6_level_8} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r6-level-12" name="rank_6_level_12" label="r6 level 12" value=${local.rank_6_level_12} update=${setNewValue} />
                <${NumberInput} id="f-artifact-r6-level-16" name="rank_6_level_16" label="r6 level 16" value=${local.rank_6_level_16} update=${setNewValue} />
            </div>
        </div>
    `;
}

