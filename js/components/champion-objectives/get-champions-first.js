import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function getChampionsFirst() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.champion_objectives.get_champions_first.', updateState);
    const local = state.inputs.champion_objectives.get_champions_first;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.get_champions_first);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0" title="Get champions for the first time">
                <span class="d-md-none">Get champions for</span> the first time
            </h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <${NumberInput} id="f-get-champ-first-common" name="common" label="common" value=${local.common} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-first-uncommon" name="uncommon" label="uncommon" value=${local.uncommon} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-first-rare" name="rare" label="rare" value=${local.rare} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-first-epic" name="epic" label="epic" value=${local.epic} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-first-legendary" name="legendary" label="legendary" value=${local.legendary} update=${setNewValue} />
    `;
}
