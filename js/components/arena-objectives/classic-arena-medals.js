import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function classicArenaMedals() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.arena_objectives.classic_arena.', updateState);
    const local = state.inputs.arena_objectives.classic_arena;
    const points = new Intl.NumberFormat().format(state.points.arena_objectives.classic_arena);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Classic</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <${NumberInput} id="f-arena-medals-bronze" name="bronze_medal" label="bronze medals" value=${local.bronze_medal} update=${setNewValue} />
        <${NumberInput} id="f-arena-medals-silver" name="silver_medal" label="silver medals" value=${local.silver_medal} update=${setNewValue} />
        <${NumberInput} id="f-arena-medals-gold" name="gold_medal" label="gold medals" value=${local.gold_medal} update=${setNewValue} />
    `;
}
