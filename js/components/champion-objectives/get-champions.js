import { html, useContext } from '../../imports.js';
import { AppContext, prepareUpdate } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function getChampions() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareUpdate('inputs.champion_objectives.get_champions.', updateState);
    const local = state.inputs.champion_objectives.get_champions;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.get_champions);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Get champions</h4>
            <span class="fs-5">${points}</span>
        </div>
        <${NumberInput} id="f-get-champ-common" name="common" label="common" value=${local.common} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-uncommon" name="uncommon" label="uncommon" value=${local.uncommon} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-rare" name="rare" label="rare" value=${local.rare} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-epic" name="epic" label="epic" value=${local.epic} update=${setNewValue} />
        <${NumberInput} id="f-get-champ-legendary" name="legendary" label="legendary" value=${local.legendary} update=${setNewValue} />
    `;
}
