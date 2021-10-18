import { html, render, useContext } from './imports.js';
import { AppContext, AppProvider } from './app-context.js';
import Header from './components/header.js';
import AccordionItem from './components/accordion-item.js';
import GetChampions from './components/champion-objectives/get-champions.js';
import GetChampionsFirst from './components/champion-objectives/get-champions-first.js';
import UpgradeLevels from './components/champion-objectives/upgrade-levels.js';
import UpgradeRanks from './components/champion-objectives/upgrade-ranks.js';
import AscendChampions from './components/champion-objectives/ascend-champions.js';
import UpgradeSkills from './components/champion-objectives/upgrade-skills.js';
import GreatHall from './components/champion-objectives/great-hall.js';
import BeatStages from './components/campaign-objectives/beat-stages.js';


function App() {
    return html`
        <${AppProvider}>
            <${Header} />
            <main class="pb-3">
                <${Main} />
            </main>
        <//>
    `;
}


function Main() {
    const { state } = useContext(AppContext);
    const pointsChampions = new Intl.NumberFormat().format(state.points.subtotals.champion_objectives);
    const pointsCampaign = new Intl.NumberFormat().format(state.points.subtotals.campaign_objectives);
    return html`
        <div class="accordion">
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-1" title="Champion objectives" counter=${pointsChampions}>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <${GetChampions} />
                        </div>
                        <div class="col-md-6 mb-3">
                            <${GetChampionsFirst} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <${UpgradeLevels} />
                        </div>
                        <div class="col-md-6 mb-3">
                            <${UpgradeRanks} />
                        </div>
                    </div>
                    <${AscendChampions} />
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <${UpgradeSkills} />
                        </div>
                        <div class="col-md-6">
                            <${GreatHall} />
                        </div>
                    </div>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-2" title="Campaign objectives" counter=${pointsCampaign}>
                    <div class="row">
                        <div class="col-md-6">
                            <${BeatStages} />
                        </div>
                    </div>
                <//>
            </div>
        </div>
    `;
}

export function renderCalculator(node) {
    render(html`<${App} />`, node);
}


