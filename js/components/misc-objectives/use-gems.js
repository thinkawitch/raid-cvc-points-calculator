import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function useGems() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.misc_objectives.use_gems.', updateState);
    const local = state.inputs.misc_objectives.use_gems;
    const points = new Intl.NumberFormat().format(state.points.misc_objectives.use_gems);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Use gems</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-use-gem" name="gem" label="Gems" value=${local.gem} update=${setNewValue} />
    `;
}
