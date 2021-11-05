import { html, useContext } from '../../imports.js';
import { AppContext } from '../../app-context.js';

const handleFocus = event => event.target.select();

export default function drinkBrew() {
    const { state, updateState } = useContext(AppContext);
    const {
        r1_levels_min, r1_levels_max, r1_points_min, r1_points_max,
        r2_levels_min, r2_levels_max, r2_points_min, r2_points_max,
        r3_levels_min, r3_levels_max, r3_points_min, r3_points_max,
        r4_levels_min, r4_levels_max, r4_points_min, r4_points_max,
        r5_levels_min, r5_levels_max, r5_points_min, r5_points_max,
        r6_levels_min, r6_levels_max, r6_points_min, r6_points_max,
    } = state.scenarios.drink_brew;

    const setBrewValue = value => updateState({ type: 'brew_prepare', value });
    const valueBrew = state.inputs.scenarios.drink_brew;

    const appendToPoints = type => updateState({ type: 'brew_to_points', value: type });

    // class="bg-light" style="--bs-bg-opacity: 0.9; margin: -1rem -1.25rem; padding: 1rem 1.25rem;"
    return html`
        <div>
            <div class="mb-1">
                I have
                <input type="number" min="0" value=${valueBrew} 
                       onInput=${e => setBrewValue(e.target.value)}
                       onFocus=${handleFocus}
                       class="form-control form-control-sm d-inline-block mx-1" style="width: 50px" />
                brews.
                I can level up so many times.
            </div>
            <table class="table table-drink-brew">
            <thead>
            <tr>
                <th scope="col">rank</th>
                <th scope="col">levels/points <span class="text-secondary">min</span></th>
                <th scope="col"><span class="text-secondary">max</span></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>rank 6</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r6_levels_min} / ${r6_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r6_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r6_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r6_levels_max} / ${r6_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r6_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r6_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th>rank 5</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r5_levels_min} / ${r5_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r5_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r5_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r5_levels_max} / ${r5_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r5_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r5_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th>rank 4</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r4_levels_min} / ${r4_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r4_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r4_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r4_levels_max} / ${r4_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r4_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r4_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th>rank 3</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r3_levels_min} / ${r3_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r3_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r3_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r3_levels_max} / ${r3_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r3_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r3_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th>rank 2</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r2_levels_min} / ${r2_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r2_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r2_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r2_levels_max} / ${r2_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r2_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r2_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th>rank 1</th>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r1_levels_min} / ${r1_points_min}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r1_min')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r1_min')}>-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-wrap">
                        ${r1_levels_max} / ${r1_points_max}
                        <div class="text-nowrap">
                            <button class="btn btn-sm btn-secondary mx-1" onClick=${() => appendToPoints('plus_r1_max')}>+</button>
                            <button class="btn btn-sm btn-secondary" onClick=${() => appendToPoints('minus_r1_max')}>-</button>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
            </table>
            <p class="small">
                min - color doesn't suit, max - brew color suits.
            </p>
        </div>
    `;
}
