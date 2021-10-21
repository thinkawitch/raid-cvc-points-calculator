import { html } from '../imports.js';

export default function numberInput({id, name, label, value, update}) {
    const val = parseInt(value) || 0;
    return html`
        <div class="row align-items-center mt-1">
            <div class="col-7">
                <label for="${id}">${label}</label>
            </div>
            <div class="col-5">
                <div class="input-group">
                    <button type="button" class="btn btn-secondary" onClick=${() => update(name, val-1 > 0 ? val-1 : 0) }>-</button>
                    <input type="number" class="form-control text-center" id=${id} min="0" value=${val} onInput=${e => update(name, e.target.value)} />
                    <button type="button" class="btn btn-secondary" onClick=${() => update(name, val+1) }>+</button>
                </div>
            </div>
        </div>
    `;
}
