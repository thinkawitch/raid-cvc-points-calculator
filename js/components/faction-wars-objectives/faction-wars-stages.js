import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function beatFactionWarsStages() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.faction_wars_objectives.faction_wars_stages.', updateState);
    const local = state.inputs.faction_wars_objectives.faction_wars_stages;
    const points = new Intl.NumberFormat().format(state.points.faction_wars_objectives.faction_wars_stages);
    const viewModeFull = state.layout.view_mode.full;
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Faction wars stages</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        ${viewModeFull && html`
        <${NumberInput} id="f-faction-wars-stage-1-5" name="stage_1_5" label="stages 1-5" value=${local.stage_1_5} update=${setNewValue} />
        `}
        <${NumberInput} id="f-faction-wars-stage-6-10" name="stage_6_10" label="stages 6-10" value=${local.stage_6_10} update=${setNewValue} />
        ${viewModeFull && html`
        <${NumberInput} id="f-faction-wars-stage-11-15" name="stage_11_15" label="stages 11-15" value=${local.stage_11_15} update=${setNewValue} />
        `}
        <${NumberInput} id="f-faction-wars-stage-16-20" name="stage_16_20" label="stages 16-20" value=${local.stage_16_20} update=${setNewValue} />
        <${NumberInput} id="f-faction-wars-stage-21" name="stage_21" label="stage 21" value=${local.stage_21} update=${setNewValue} />
    `;
}
