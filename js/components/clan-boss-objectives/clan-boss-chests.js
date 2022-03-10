import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function clanBossChests() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.clan_boss_objectives.clan_boss_chests.', updateState);
    const local = state.inputs.clan_boss_objectives.clan_boss_chests;
    const points = new Intl.NumberFormat().format(state.points.clan_boss_objectives.clan_boss_chests);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Clan boss chests</h4>
            <span class="fs-5">${points}</span>
        </div>
        <div class="row row-with-center-separator">
            <div class="col-md-6">
                <${NumberInput} id="f-cb-chest-novice" name="novice" label="novice" value=${local.novice} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-adept" name="adept" label="adept" value=${local.adept} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-warrior" name="warrior" label="warrior" value=${local.warrior} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-knight" name="knight" label="knight (cb2)" value=${local.knight} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-cb-chest-guardian" name="guardian" label="guardian (cb3)" value=${local.guardian} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-master" name="master" label="master" value=${local.master} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-grandmaster" name="grandmaster" label="grandmaster (cb4)" value=${local.grandmaster} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-ultimate" name="ultimate" label="ultimate (cb5)" value=${local.ultimate} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-cb-chest-mythical" name="mythical" label="mythical" value=${local.mythical} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-divine" name="divine" label="divine" value=${local.divine} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-celestial" name="celestial" label="celestial" value=${local.celestial} update=${setNewValue} />
                <${NumberInput} id="f-cb-chest-transcendent" name="transcendent" label="transcendent" value=${local.transcendent} update=${setNewValue} />
            </div>
        </div>
    `;
}

