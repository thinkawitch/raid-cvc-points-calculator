import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function beatCampaignStages() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.stages_objectives.campaign_stages.', updateState);
    const local = state.inputs.stages_objectives.campaign_stages;
    const points = new Intl.NumberFormat().format(state.points.stages_objectives.campaign_stages);
    const viewModeFull = state.layout.view_mode.full;
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Campaign stages</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        ${viewModeFull && html`
        <${NumberInput} id="f-beat-campaign-normal" name="normal" label="on normal" value=${local.normal} update=${setNewValue} />
        <${NumberInput} id="f-beat-campaign-hard" name="hard" label="on hard" value=${local.hard} update=${setNewValue} />
        `}
        <${NumberInput} id="f-beat-campaign-brutal" name="brutal" label="on brutal" value=${local.brutal} update=${setNewValue} />
        <${NumberInput} id="f-beat-campaign-nightmare" name="nightmare" label="on nightmare" value=${local.nightmare} update=${setNewValue} />
    `;
}
