import { html } from '../imports.js';

const handleFocus = event => event.target.select();

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
                    <input type="number" class="form-control text-center" 
                           id=${id} value=${val} min="0" 
                           onInput=${e => update(name, e.target.value)}
                           onFocus=${handleFocus} />
                    <button type="button" class="btn btn-secondary" onClick=${() => update(name, val+1) }>+</button>
                </div>
            </div>
        </div>
    `;
}
