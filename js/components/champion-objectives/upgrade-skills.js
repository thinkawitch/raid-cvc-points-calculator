import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function upgradeSkills() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.champion_objectives.upgrade_skills.', updateState);
    const local = state.inputs.champion_objectives.upgrade_skills;
    const points = new Intl.NumberFormat().format(state.points.champion_objectives.upgrade_skills);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Upgrade skills</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <${NumberInput} id="f-upgrade-skill-common" name="common" label="common skill" value=${local.common} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-skill-uncommon" name="uncommon" label="uncommon skill" value=${local.uncommon} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-skill-rare" name="rare" label="rare skill" value=${local.rare} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-skill-epic" name="epic" label="epic skill" value=${local.epic} update=${setNewValue} />
        <${NumberInput} id="f-upgrade-skill-legendary" name="legendary" label="legendary skill" value=${local.legendary} update=${setNewValue} />
    `;
}
