import { html, useContext } from '../../imports.js';
import { AppContext } from '../../app-context.js';

export default function plansResources() {
    const { state, updateState } = useContext(AppContext);
    const {
        energy, energy_r1_10, energy_r2_20, energy_r3_30, energy_r4_40,
        r1_1, r1_10, r2_1, r2_20, r3_1, r3_30, r4_1, r4_40,
        points_1_min, points_1_max,
        points_2_min, points_2_max,
        points_3_min, points_3_max,
        points_4_min, points_4_max,
    } = state.plans_resources.prepare_r5_chickens;

    const setR5Value = value => updateState({ prepare_r5_chickens: true, value });
    const valueR5 = state.inputs.plans_resources.prepare_r5_chickens;

    const appendToPoints = type => updateState({ append_chickens_to_points: true, value: type });


    return html`
        <div>
            <div class="d-flex flex-wrap">
                <div class="me-1 mb-1">
                    I want to prepare 
                    <input type="number" min="0" max="99" value=${valueR5} onInput=${e => setR5Value(e.target.value)} 
                           class="form-control form-control-sm d-inline-block mx-1" style="width: 40px" />
                    <sup class="text-secondary">5*</sup><sub class="text-secondary">L1</sub> chickens.
                </div>
                <div>
                    Beat stages on 
                    <select class="form-select form-select-sm d-inline-block mx-1" style="width: 120px">
                        <option value="brutal_12_6" selected>brutal 12.6</option>
                    </select>
                </div>
            </div>
            
            <div class="mb-1">
                I need to level up from 1* to 4* chickens.    
            </div>
            <table class="table table-get-r5-chicken">
            <thead>
                <tr>
                    <th scope="colgroup" colspan="3">champions</th>
                    <th scope="col">energy</th>
                    <th scope="col">points <span class="text-secondary">min</span></th>
                    <th scope="col"><span class="text-secondary">max</span></th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-nowrap" style="width:2%;">
                    <strong>${r4_40}</strong> \
                    <sup class="text-secondary">4*</sup><sub class="text-secondary">L40</sub>
                </td>
                <td>+</td>
                <td>
                    <strong>${r4_1}</strong> \
                    <sup class="text-secondary">4*</sup><sub class="text-secondary">L1</sub>
                </td>
                <td>${energy_r4_40}</td>
                <td>
                    ${points_4_min}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r4_min')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r4_min')}>-</button>
                </td>
                <td>
                    ${points_4_max}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r4_max')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r4_max')}>-</button>
                </td>
            </tr>
            <tr>
                <td class="text-nowrap" style="width:2%;">
                    <strong>${r3_30}</strong> \
                    <sup class="text-secondary">3*</sup><sub class="text-secondary">L30</sub>
                </td>
                <td>+</td>
                <td>
                    <strong>${r3_1}</strong> \
                    <sup class="text-secondary">3*</sup><sub class="text-secondary">L1</sub>
                </td>
                <td>
                    ${energy_r3_30}
                </td>
                <td>
                    ${points_3_min}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r3_min')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r3_min')}>-</button>
                </td>
                <td>
                    ${points_3_max}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r3_max')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r3_max')}>-</button>
                </td>
            </tr>
            <tr>
                <td class="text-nowrap" style="width:2%;">
                    <strong>${r2_20}</strong> \
                    <sup class="text-secondary">2*</sup><sub class="text-secondary">L20</sub>
                </td>
                <td>+</td>
                <td>
                    <strong>${r2_1}</strong> \
                    <sup class="text-secondary">2*</sup><sub class="text-secondary">L1</sub>
                </td>
                <td>
                    ${energy_r2_20}
                </td>
                <td>
                    ${points_2_min}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r2_min')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r2_min')}>-</button>
                </td>
                <td>
                    ${points_2_max}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r2_max')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r2_max')}>-</button>
                </td>
            </tr>
            <tr>
                <td class="text-nowrap" style="width:2%;">
                    <strong>${r1_10}</strong> \
                    <sup class="text-secondary">1*</sup><sub class="text-secondary">L10</sub>
                </td>
                <td>+</td>
                <td>
                    <strong>${r1_1}</strong> \
                    <sup class="text-secondary">1*</sup><sub class="text-secondary">L1</sub>
                </td>
                <td>
                    ${energy_r1_10}
                </td>
                <td>
                    ${points_1_min}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r1_min')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r1_min')}>-</button>
                </td>
                <td>
                    ${points_1_max}
                    <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r1_max')}>+</button>
                    <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r1_max')}>-</button>
                </td>
            </tr>
            </tbody>
            </table>
            
        </div>
    `;
}
