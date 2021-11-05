import { html, useState, useContext } from '../imports.js';
import { AppContext } from '../app-context.js';

export default function scenarioItem({ id, title, children }) {
    const { state, updateState } = useContext(AppContext);
    const [ collapsed, setCollapsed ] = useState(state.layout.scenario_items_collapsed[id]);
    const toggle = () => {
        setCollapsed(!collapsed);
        updateState({ type: 'update_by_path', path: 'layout.scenario_items_collapsed.'+id, value: !collapsed });
    }
    const btnClass = collapsed ? 'btn-secondary' : 'btn-outline-secondary';
    const arr = collapsed ? '↓' : '↑';

    return html`
        <button class="btn ${btnClass} d-block mb-2" onClick=${toggle}>
            ${title} ${arr}
        </button>
        ${!collapsed && children}
    `;
}
