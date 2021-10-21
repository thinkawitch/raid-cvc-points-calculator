import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function beatDragonStages() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.stages_objectives.dragon_stages.', updateState);
    const local = state.inputs.stages_objectives.dragon_stages;
    const points = new Intl.NumberFormat().format(state.points.stages_objectives.dragon_stages);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Dragon stages</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-dragon-stage-1-5" name="stage_1_5" label="stages 1-5" value=${local.stage_1_5} update=${setNewValue} />
        <${NumberInput} id="f-dragon-stage-6-10" name="stage_6_10" label="stages 6-10" value=${local.stage_6_10} update=${setNewValue} />
        <${NumberInput} id="f-dragon-stage-11-15" name="stage_11_15" label="stages 11-15" value=${local.stage_11_15} update=${setNewValue} />
        <${NumberInput} id="f-dragon-stage-16-19" name="stage_16_19" label="stages 16-19" value=${local.stage_16_19} update=${setNewValue} />
        <${NumberInput} id="f-dragon-stage-20-24" name="stage_20_24" label="stages 20-24" value=${local.stage_20_24} update=${setNewValue} />
        <${NumberInput} id="f-dragon-stage-25" name="stage_25" label="stage 25" value=${local.stage_25} update=${setNewValue} />
    `;
}
