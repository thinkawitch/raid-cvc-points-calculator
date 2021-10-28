import { html, useState, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function accordionItem({ id, title, counter, children }) {
    // local state not synchronized with appContext, suits this logic - but remember
    const { state, updateState } = useContext(AppContext);
    const [ collapsed, setCollapsed ] = useState(state.layout.accordion_items_collapsed[id]);
    const toggle = () => {
        setCollapsed(!collapsed);
        updateState({ path: 'layout.accordion_items_collapsed.'+id, value: !collapsed });
    }
    const idHeader = id + '-header';
    const idBody = id + '-body'
    const ariaExpanded = collapsed ? 'false' : 'true';
    const btnClass = collapsed ? 'collapsed' : ''
    const bodyClass = collapsed ? '' : 'show';
    const showCounter = counter !== undefined;

    return html`
        <h2 class="accordion-header accordion-header-sticky" id=${idHeader}>
            <button class="accordion-button ${btnClass} fs-5" type="button" onClick=${toggle} aria-expanded=${ariaExpanded} aria-controls=${idBody}>
                <div class="d-flex flex-grow-1 align-items-center">
                    <div class="flex-grow-1">${title}</div>
                    ${showCounter && html`<span class="me-3">${counter}</span>`}
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
