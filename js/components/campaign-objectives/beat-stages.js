import { html, useContext } from '../../imports.js';
import { AppContext, prepareUpdate } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function beatStages() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareUpdate('inputs.campaign_objectives.beat_stages.', updateState);
    const local = state.inputs.campaign_objectives.beat_stages;
    const points = new Intl.NumberFormat().format(state.points.campaign_objectives.beat_stages);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Beat stages</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-beat-stages-normal" name="normal" label="on normal" value=${local.normal} update=${setNewValue} />
        <${NumberInput} id="f-beat-stages-hard" name="hard" label="on hard" value=${local.hard} update=${setNewValue} />
        <${NumberInput} id="f-beat-stages-brutal" name="brutal" label="on brutal" value=${local.brutal} update=${setNewValue} />
        <${NumberInput} id="f-beat-stages-nightmare" name="nightmare" label="on nightmare" value=${local.nightmare} update=${setNewValue} />
    `;
}
