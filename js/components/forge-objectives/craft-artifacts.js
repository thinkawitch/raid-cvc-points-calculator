import { html, useContext } from '../../imports.js';
import { AppContext, prepareStateUpdateWithPath } from '../../app-context.js';
import NumberInput from '../number-input.js';

export default function craftArtifacts() {
    const { state, updateState } = useContext(AppContext);
    const setNewValue = prepareStateUpdateWithPath('inputs.forge_objectives.craft_artifacts.', updateState);
    const local = state.inputs.forge_objectives.craft_artifacts;
    const points = new Intl.NumberFormat().format(state.points.forge_objectives.craft_artifacts);
    return html`
        <div class="d-flex align-items-center">
            <h4 class="flex-grow-1 m-0">Craft artifacts</h4>
            <span class="fs-5 text-truncate">${points}</span>
        </div>
        <div class="row row-with-center-separator">
            <div class="col-md-6">
                <${NumberInput} id="f-craft-artifact-rare-r3" name="rare_rank_3" label="rare rank 3" value=${local.rare_rank_3} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-rare-r4" name="rare_rank_4" label="rare rank 4" value=${local.rare_rank_4} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-rare-r5" name="rare_rank_5" label="rare rank 5" value=${local.rare_rank_5} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-rare-r6" name="rare_rank_6" label="rare rank 6" value=${local.rare_rank_6} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-craft-artifact-epic-r3" name="epic_rank_3" label="epic rank 3" value=${local.epic_rank_3} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-epic-r4" name="epic_rank_4" label="epic rank 4" value=${local.epic_rank_4} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-epic-r5" name="epic_rank_5" label="epic rank 5" value=${local.epic_rank_5} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-epic-r6" name="epic_rank_6" label="epic rank 6" value=${local.epic_rank_6} update=${setNewValue} />
            </div>
            <div class="col-md-6">
                <${NumberInput} id="f-craft-artifact-legendary-r3" name="legendary_rank_3" label="legendary rank 3" value=${local.legendary_rank_3} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-legendary-r4" name="legendary_rank_4" label="legendary rank 4" value=${local.legendary_rank_4} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-legendary-r5" name="legendary_rank_5" label="legendary rank 5" value=${local.legendary_rank_5} update=${setNewValue} />
                <${NumberInput} id="f-craft-artifact-legendary-r6" name="legendary_rank_6" label="legendary rank 6" value=${local.legendary_rank_6} update=${setNewValue} />
            </div>
        </div>
    `;
}
