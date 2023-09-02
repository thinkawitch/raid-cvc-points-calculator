import { html, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function header() {
    const { state, updateState } = useContext(AppContext);
    const points = new Intl.NumberFormat().format(state.points.total);
    const clear = () => updateState({ type: 'clear' });
    const isFullView = state.layout.view_mode.full;
    const toggleFullView = () => {
        updateState({ type: 'update_by_path', path: 'layout.view_mode.full', value: !isFullView });
    }
    return html`
        <h1 class="d-flex align-items-center">
            <span class="text-truncate">Raid CvC points calculator</span>
            <span class="fs-4 ms-2">⚔</span>
        </h1>
        <div class="d-flex flex-row align-items-center">
            <span class="flex-shrink-0"><span class="d-none d-sm-inline">Total </span>points:</span>
            <span class="fs-3 ms-2 text-truncate" id="total-points">${points}</span>
            <div class="btn-group ms-auto" role="group" aria-label="View mode">
                <input type="radio" class="btn-check" name="view-mode" id="view-mode-short" autocomplete="off" onClick=${toggleFullView} checked=${!isFullView} />
                <label class="btn btn-sm btn-outline-secondary" for="view-mode-short">short</label>
                <input type="radio" class="btn-check" name="view-mode" id="view-mode-full" autocomplete="off" onClick=${toggleFullView} checked=${isFullView} />
                <label class="btn btn-sm btn-outline-secondary" for="view-mode-full">full</label>
            </div>
            <button class="btn btn-secondary btn-sm ms-auto-off ms-2" onClick=${clear}>clear</button>
        </div>
    `;
}
