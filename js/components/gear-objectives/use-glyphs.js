import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function useGlyphs() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.gear_objectives.use_glyphs.', updateState);
    const local = state.inputs.gear_objectives.use_glyphs;
    const points = new Intl.NumberFormat().format(state.points.gear_objectives.use_glyphs);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Use glyphs</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-glyph-rank-1" name="rank_1" label="rank 1" value=${local.rank_1} update=${setNewValue} />
        <${NumberInput} id="f-glyph-rank-2" name="rank_2" label="rank 2" value=${local.rank_2} update=${setNewValue} />
        <${NumberInput} id="f-glyph-rank-3" name="rank_3" label="rank 3" value=${local.rank_3} update=${setNewValue} />
        <${NumberInput} id="f-glyph-rank-4" name="rank_4" label="rank 4" value=${local.rank_4} update=${setNewValue} />
        <${NumberInput} id="f-glyph-rank-5" name="rank_5" label="rank 5" value=${local.rank_5} update=${setNewValue} />
        <${NumberInput} id="f-glyph-rank-6" name="rank_6" label="rank 6" value=${local.rank_6} update=${setNewValue} />
    `;
}
