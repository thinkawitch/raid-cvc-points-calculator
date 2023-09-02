import { html, useEffect, useCallback, useRef } from '../imports.js';

const handleFocus = event => event.target.select();

export default function numberInput({id, name, label, value, update}) {
    /*if (id == 'f-faction-wars-stage-6-10') {
        console.log('numberInput', value)
    }*/
    const val = parseInt(value) || 0;
    const timerMinus = useRef(null);
    const counterMinus = useRef(0);
    const timerPlus = useRef(null);
    const counterPlus = useRef(0);

    const oneMinus = useCallback(() => {
        update(name, val-1 > 0 ? val-1 : 0)
    }, [val])
    const onePlus = useCallback(() => {
        update(name, val+1)
    }, [val])

    const touchMinusStart = useCallback(() => {
        if (timerMinus.current) return;
        //console.log('touchMinusStart')
        counterMinus.current = 0;
        timerMinus.current = setInterval(() => {
            //console.log('tick minus', val)
            counterMinus.current++;
            update(name, val-counterMinus.current > 0 ? val-counterMinus.current : 0)
        }, 200)
    }, [val])
    const touchMinusEnd = () => {
        //console.log('touchMinusEnd')
        if (timerMinus.current) {
            clearInterval(timerMinus.current);
            timerMinus.current = null;
        }
    }

    const touchPlusStart = useCallback(() => {
        if (timerPlus.current) return;
        //console.log('touchPlusStart')
        counterPlus.current = 0;
        timerPlus.current = setInterval(() => {
            //console.log('tick plus', val)
            counterPlus.current++;
            update(name, val + counterPlus.current)
        }, 200)
    }, [val])
    const touchPlusEnd = () => {
        //console.log('touchPlusEnd')
        if (timerPlus.current) {
            clearInterval(timerPlus.current);
            timerPlus.current = null;
        }
    }

    useEffect(() => {
        return () => {
            //console.log('useEffect unsubscribe')
            if (timerMinus.current) {
                clearInterval(timerMinus.current);
                timerMinus.current = null;
            }
            if (timerPlus.current) {
                clearInterval(timerPlus.current);
                timerPlus.current = null;
            }
        }
    }, []);

    return html`
        <div class="row align-items-center mt-1">
            <div class="col-7">
                <label for="${id}">${label}</label>
            </div>
            <div class="col-5">
                <div class="input-group">
                    <button type="button" class="btn btn-secondary" 
                            onclick=${oneMinus}
                            onmousedown=${touchMinusStart}
                            onmouseup=${touchMinusEnd}
                            onmouseleave=${touchMinusEnd}
                            onblur=${touchMinusEnd}
                            ontouchstart=${touchMinusStart}
                            ontouchend=${touchMinusEnd}
                            ontouchcancel=${touchMinusEnd}
                    >-</button>
                    <input type="number" class="form-control text-center" 
                           id=${id} value=${val} min="0" 
                           onInput=${e => update(name, e.target.value)}
                           onFocus=${handleFocus} />
                    <button type="button" class="btn btn-secondary" 
                            onclick=${onePlus} 
                            onmousedown=${touchPlusStart}
                            onmouseup=${touchPlusEnd}
                            onmouseleave=${touchPlusEnd}
                            onblur=${touchPlusEnd}
                            ontouchstart=${touchPlusStart}
                            ontouchend=${touchPlusEnd}
                            ontouchcancel=${touchPlusEnd}
                    >+</button>
                </div>
            </div>
        </div>
    `;
}
