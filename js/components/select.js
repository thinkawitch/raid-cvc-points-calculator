import { html, useState } from '../imports.js';

export default function select({ name, options, value, update }) {
    return html`
        <select class="form-select form-select-sm d-inline-block mx-1" style="width: 100px"
                name=${name} 
                value=${value}
                onchange=${e => update(e.target.value)}>
            ${options.map(opt => {
                const attrs = {};
                if (value === opt.value)  {
                    attrs.selected = true; // seems no need for preact
                }
                return html`<option key=${opt.value} value=${opt.value} ...${attrs} >${opt.name}</option>`
            })}
        </select>
    `;
}
