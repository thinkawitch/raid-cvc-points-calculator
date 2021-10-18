import { html, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function header() {
    const { state } = useContext(AppContext);
    const points = new Intl.NumberFormat().format(state.points.total);

    return html`
        <header class="position-sticky top-0 mb-2">
            <h1>Raid CvC points calculator <span class="fs-4">⚔</span></h1>
            <div class="d-flex flex-row align-items-center">
                <span>Total points:</span>
                <span class="fs-2 ms-2" id="total-points">${points}</span>
            </div>
        </header>
    `;
}
