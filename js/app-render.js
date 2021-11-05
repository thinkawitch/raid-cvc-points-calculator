import { html, render, useContext } from './imports.js';
import { AppContext, AppProvider } from './app-context.js';
import Header from './components/header.js';
import AccordionItem from './components/accordion-item.js';
import ScenarioItem from './components/scenario-item.js';
import GetChampions from './components/champion-objectives/get-champions.js';
import GetChampionsFirst from './components/champion-objectives/get-champions-first.js';
import UpgradeLevels from './components/champion-objectives/upgrade-levels.js';
import UpgradeRanks from './components/champion-objectives/upgrade-ranks.js';
import AscendChampions from './components/champion-objectives/ascend-champions.js';
import UpgradeSkills from './components/champion-objectives/upgrade-skills.js';
import GreatHall from './components/champion-objectives/great-hall.js';
import CampaignStages from './components/stages-objectives/campaign-stages.js';
import PotionKeepStages from './components/stages-objectives/potion-keep-stages.js';
import MinotaurStages from './components/stages-objectives/minotaur-stages.js';
import DragonStages from './components/stages-objectives/dragon-stages.js';
import IceGolemStages from './components/stages-objectives/ice-golem-stages.js';
import FireKnightStages from './components/stages-objectives/fire-knight-stages.js';
import SpiderStages from './components/stages-objectives/spider-stages.js';
import FactionWarsStages from './components/faction-wars-objectives/faction-wars-stages.js';
import ClassicArenaMedals from './components/arena-objectives/classic-arena-medals.js';
import TagTeamArenaBars from './components/arena-objectives/tag-team-arena-bars.js';
import ClanBossChests from './components/clan-boss-objectives/clan-boss-chests.js';
import UseGlyphs from './components/gear-objectives/use-glyphs.js';
import UpgradeArtifacts from './components/gear-objectives/upgrade-artifacts.js';
import CraftArtifacts from './components/forge-objectives/craft-artifacts.js';
import UseGems from './components/misc-objectives/use-gems.js';
import PrepareChickens from './components/scenarios/prepare-chickens.js';
import DrinkBrew from './components/scenarios/drink-brew.js';


function App() {
    return html`
        <${AppProvider}>
            <header class="position-sticky top-0">
                <${Header} />
            </header>
            <main>
                <${Main} />
            </main>
        <//>
    `;
}


function Main() {
    const { state } = useContext(AppContext);
    const nf = new Intl.NumberFormat();
    const pointsChampions = nf.format(state.points.subtotals.champion_objectives);
    const pointsStages = nf.format(state.points.subtotals.stages_objectives);
    const pointsFactionWars = nf.format(state.points.subtotals.faction_wars_objectives);
    const pointsArena = nf.format(state.points.subtotals.arena_objectives);
    const pointsClanBoss = nf.format(state.points.subtotals.clan_boss_objectives);
    const pointsGearObjectives = nf.format(state.points.subtotals.gear_objectives);
    const pointsForgeObjectives = nf.format(state.points.subtotals.forge_objectives);
    const pointsMiscObjectives = nf.format(state.points.subtotals.misc_objectives);
    return html`
        <div class="accordion">
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-scenarios" title="Scenarios">
                    <${ScenarioItem} id="scenario-item-1" title="Level up">
                        <${PrepareChickens} />    
                    <//>
                    <${ScenarioItem} id="scenario-item-2" title="Brew">
                        <${DrinkBrew} />
                    <//>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-1" title="Champion objectives" counter=${pointsChampions}>
                    <div class="row">
                        <div class="col-md-6">
                            <${GetChampions} />
                        </div>
                        <div class="col-md-6 mt-3 mt-md-0">
                            <${GetChampionsFirst} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-3">
                            <${UpgradeLevels} />
                        </div>
                        <div class="col-md-6 mt-3">
                            <${UpgradeRanks} />
                        </div>
                    </div>
                    <${AscendChampions} />
                    <div class="row">
                        <div class="col-md-6 mt-3">
                            <${UpgradeSkills} />
                        </div>
                        <div class="col-md-6 mt-3">
                            <${GreatHall} />
                        </div>
                    </div>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-2" title="Beat stages objectives" counter=${pointsStages}>
                    <div class="row">
                        <div class="col-md-6">
                            <${CampaignStages} />
                        </div>
                        <div class="col-md-6 mt-3 mt-md-0">
                            <${PotionKeepStages} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-3">
                            <${MinotaurStages} />
                        </div>
                        <div class="col-md-6 mt-3">
                            <${DragonStages} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-3">
                            <${IceGolemStages} />
                        </div>
                        <div class="col-md-6 mt-3">
                            <${FireKnightStages} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-3">
                            <${SpiderStages} />
                        </div>
                    </div>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-3" title="Faction wars" counter=${pointsFactionWars}>
                    <div class="row">
                        <div class="col-md-6">
                            <${FactionWarsStages} />
                        </div>
                        <div class="col-md-6 mt-3 mt-md-0">
                            
                        </div>
                    </div>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-4" title="Arena" counter=${pointsArena}>
                    <div class="row">
                        <div class="col-md-6">
                            <${ClassicArenaMedals} />
                        </div>
                        <div class="col-md-6 mt-3 mt-md-0">
                            <${TagTeamArenaBars} />
                        </div>
                    </div>
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-5" title="Clan boss" counter=${pointsClanBoss}>
                    <${ClanBossChests} />
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-6" title="Gear objectives" counter=${pointsGearObjectives}>
                    <div class="row">
                        <div class="col-md-6">
                            <${UseGlyphs} />
                        </div>
                    </div>
                    <${UpgradeArtifacts} />
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-7" title="Forge objectives" counter=${pointsForgeObjectives}>
                    <${CraftArtifacts} />
                <//>
            </div>
            <div class="accordion-item">
                <${AccordionItem} id="accordion-item-8" title="Misc objectives" counter=${pointsMiscObjectives}>
                    <div class="row">
                        <div class="col-md-6">
                            <${UseGems} />
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


