import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function tagTeamArenaBars() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.arena_objectives.tag_team_arena.', updateState);
    const local = state.inputs.arena_objectives.tag_team_arena;
    const points = new Intl.NumberFormat().format(state.points.arena_objectives.tag_team_arena);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Tag team</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <${NumberInput} id="f-tag-team-arena-bars" name="gold_bars" label="gold bars" value=${local.gold_bars} update=${setNewValue} />
    `;
}
