import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function liveArenaCrests() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.arena_objectives.live_arena.', updateState);
    const local = state.inputs.arena_objectives.live_arena;
    const points = new Intl.NumberFormat().format(state.points.arena_objectives.live_arena);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Live</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <${NumberInput} id="f-live-arena-crests" name="crests" label="crests" value=${local.crests} update=${setNewValue} />
    `;
}
