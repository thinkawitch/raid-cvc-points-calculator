import { html, useContext } from '../../imports.js';
import { AppContext, prepareUpdate } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function greatHall() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareUpdate('inputs.champion_objectives.great_hall.', updateState);
    const local = state.inputs.champion_objectives.great_hall;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.great_hall);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Great hall bonuses</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-great-hall-bonus-1" name="level_1" label="bonus level 1" value=${local.level_1} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-2" name="level_2" label="bonus level 2" value=${local.level_2} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-3" name="level_3" label="bonus level 3" value=${local.level_3} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-4" name="level_4" label="bonus level 4" value=${local.level_4} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-5" name="level_5" label="bonus level 5" value=${local.level_5} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-6" name="level_6" label="bonus level 6" value=${local.level_6} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-7" name="level_7" label="bonus level 7" value=${local.level_7} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-8" name="level_8" label="bonus level 8" value=${local.level_8} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-9" name="level_9" label="bonus level 9" value=${local.level_9} update=${setNewValue} />
        <${NumberInput} id="f-great-hall-bonus-10" name="level_10" label="bonus level 10" value=${local.level_10} update=${setNewValue} />
    `;
}
