import { html } from '../imports.js';

export default function numberInput({id, name, label, value, update}) {
    //console.log('render numberInput', id)
    return html`
        <div class="row align-items-center mt-1">
            <div class="col-7">
                <label for="${id}">${label}</label>
            </div>
            <div class="col-5">
                <input type="number" id=${id} min="0" value=${value} class="form-control" onInput=${(e) => update(name, e.target.value)} />
            </div>
        </div>
    `;
}
