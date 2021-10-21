import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function ascendChampions() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.champion_objectives.ascend_champions.', updateState);
    const local = state.inputs.champion_objectives.ascend_champions;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.ascend_champions);
    return html`
        <div class="d-flex align-items-center mt-3">
            <h4 class="flex-grow-1 m-0">Ascend champions</h4>
            <span class="fs-5">${points}</span>
        </div>
        <div class="row">
            <div class="col-md-6">
                <${NumberInput} id="f-ascend-uncommon-1" name="uncommon_1" label="uncommon level 1" value=${local.uncommon_1} update=${setNewValue} />
                <${NumberInput} id="f-ascend-uncommon-2" name="uncommon_2" label="uncommon level 2" value=${local.uncommon_2} update=${setNewValue} />
                <${NumberInput} id="f-ascend-uncommon-3" name="uncommon_3" label="uncommon level 3" value=${local.uncommon_3} update=${setNewValue} />
                <${NumberInput} id="f-ascend-uncommon-4" name="uncommon_4" label="uncommon level 4" value=${local.uncommon_4} update=${setNewValue} />
                <${NumberInput} id="f-ascend-uncommon-5" name="uncommon_5" label="uncommon level 5" value=${local.uncommon_5} update=${setNewValue} />
                <${NumberInput} id="f-ascend-uncommon-6" name="uncommon_6" label="uncommon level 6" value=${local.uncommon_6} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-ascend-rare-1" name="rare_1" label="rare level 1" value=${local.rare_1} update=${setNewValue} />
                <${NumberInput} id="f-ascend-rare-2" name="rare_2" label="rare level 2" value=${local.rare_2} update=${setNewValue} />
                <${NumberInput} id="f-ascend-rare-3" name="rare_3" label="rare level 3" value=${local.rare_3} update=${setNewValue} />
                <${NumberInput} id="f-ascend-rare-4" name="rare_4" label="rare level 4" value=${local.rare_4} update=${setNewValue} />
                <${NumberInput} id="f-ascend-rare-5" name="rare_5" label="rare level 5" value=${local.rare_5} update=${setNewValue} />
                <${NumberInput} id="f-ascend-rare-6" name="rare_6" label="rare level 6" value=${local.rare_6} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-ascend-epic-1" name="epic_1" label="epic level 1" value=${local.epic_1} update=${setNewValue} />
                <${NumberInput} id="f-ascend-epic-2" name="epic_2" label="epic level 2" value=${local.epic_2} update=${setNewValue} />
                <${NumberInput} id="f-ascend-epic-3" name="epic_3" label="epic level 3" value=${local.epic_3} update=${setNewValue} />
                <${NumberInput} id="f-ascend-epic-4" name="epic_4" label="epic level 4" value=${local.epic_4} update=${setNewValue} />
                <${NumberInput} id="f-ascend-epic-5" name="epic_5" label="epic level 5" value=${local.epic_5} update=${setNewValue} />
                <${NumberInput} id="f-ascend-epic-6" name="epic_6" label="epic level 6" value=${local.epic_6} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-ascend-legendary-1" name="legendary_1" label="legendary level 1" value=${local.legendary_1} update=${setNewValue} />
                <${NumberInput} id="f-ascend-legendary-2" name="legendary_2" label="legendary level 2" value=${local.legendary_2} update=${setNewValue} />
                <${NumberInput} id="f-ascend-legendary-3" name="legendary_3" label="legendary level 3" value=${local.legendary_3} update=${setNewValue} />
                <${NumberInput} id="f-ascend-legendary-4" name="legendary_4" label="legendary level 4" value=${local.legendary_4} update=${setNewValue} />
                <${NumberInput} id="f-ascend-legendary-5" name="legendary_5" label="legendary level 5" value=${local.legendary_5} update=${setNewValue} />
                <${NumberInput} id="f-ascend-legendary-6" name="legendary_6" label="legendary level 6" value=${local.legendary_6} update=${setNewValue} />
            </div>
        </div>
    `;
}
