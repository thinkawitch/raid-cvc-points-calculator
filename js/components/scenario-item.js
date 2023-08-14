import { html, useState, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function scenarioItem({ id, title, children, last }) {
    const { state, updateState } = useContext(AppContext);
    const [ collapsed, setCollapsed ] = useState(state.layout.scenario_items_collapsed[id]);
    const toggle = () => {
        setCollapsed(!collapsed);
        updateState({ type: 'update_by_path', path: 'layout.scenario_items_collapsed.'+id, value: !collapsed });
    }

    let btnClass = collapsed ? 'btn-secondary' : 'btn-outline-secondary';
    if (!last || !collapsed) btnClass += ' mb-2';

    let contentClass = (!collapsed) ? 'mb-3' : '';
    if (last) contentClass = 'mb-0';

    const arrow = collapsed ? '↓' : '↑';

    return html`
        <button class="btn ${btnClass} d-block" onClick=${toggle}>
            ${title} ${arrow}
        </button>
        ${!collapsed && html`<div class=${contentClass}>${children}</div>`}
    `;
}
