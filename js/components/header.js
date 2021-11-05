import { html, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function header() {
    const { state, updateState } = useContext(AppContext);
    const points = new Intl.NumberFormat().format(state.points.total);
    const clear = () => updateState({ type: 'clear' });
    return html`
        <h1 class="d-flex align-items-center">
            <span class="text-truncate">Raid CvC points calculator</span>
            <span class="fs-4 ms-2">⚔</span>
        </h1>
        <div class="d-flex flex-row align-items-center">
            <span class="flex-shrink-0">Total points:</span>
            <span class="fs-3 ms-2 text-truncate" id="total-points">${points}</span>
            <button class="btn btn-secondary btn-sm ms-auto" onClick=${clear}>clear</button>
        </div>
    `;
}
