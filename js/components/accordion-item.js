import { html, useState } from '../imports.js';

export default function accordionItem({ id, title, counter, children }) {
    // own state and handler for future state recover from localstore
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    }
    const idHeader = id + '-header';
    const idBody = id + '-body'
    const ariaExpanded = collapsed ? 'false' : 'true';
    const btnClass = collapsed ? 'collapsed' : ''
    const bodyClass = collapsed ? '' : 'show';

    return html`
        <h2 class="accordion-header" id=${idHeader}>
            <button class="accordion-button ${btnClass} fs-5" type="button" onClick=${toggle} aria-expanded=${ariaExpanded} aria-controls=${idBody}>
                <div class="d-flex flex-grow-1 align-items-center">
                    <div class="flex-grow-1">${title}</div>
                    <span class="me-3">${counter}</span>
                </div>
            </button>
        </h2>
        <div id=${idBody} class="accordion-collapse collapse ${bodyClass}" aria-labelledby=${idHeader}>
            <div class="accordion-body">
                ${children}
            </div>
        </div>
    `;
}
